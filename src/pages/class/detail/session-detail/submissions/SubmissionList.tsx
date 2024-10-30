import { useParams } from 'react-router-dom'
import AssignmentDetailInformation from '../components/AssignmentDetailInformation'
import { AssignmentDto } from '~/data/course/course.dto'
import SubmissionTable from './components/SubmissionTable'
import { protectedRoute } from '~/routes/routes'
import PageHeader from '~/components/header/PageHeader'
import { useEffect, useState } from 'react'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { AssignmentSubmissionItemResponseDto } from '~/data/class/class.dto'

const SubmissionList = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId
  const assignmentId = params.assignmentId

  const { getAssignmentById, getSubmissionList } = useClassApi()
  const [dataAssignment, setDataAssignment] = useState<AssignmentDto | null>(null)
  const [dataSubmissions, setDataSubmissions] = useState<AssignmentSubmissionItemResponseDto[] | null>(null)

  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId!)
    },
    {
      ...protectedRoute.classSessionDetail,
      path: protectedRoute.classSessionDetail.path.replace(':classId', classId!).replace(':sessionId', sessionId!)
    },
    protectedRoute.classSubmissionList
  ]

  useEffect(() => {
    ;(async () => {
      const [{ data: assignment, error: assignmentError }, { data: submissions, error: submissionsError }] =
        await Promise.all([getAssignmentById(classId!, assignmentId!), getSubmissionList(classId!, assignmentId!)])

      setDataAssignment(assignment)
      setDataSubmissions(submissions)

      const combinedErrorMessage = [assignmentError?.message, submissionsError?.message].filter(Boolean).join(' | ')

      if (combinedErrorMessage) {
        notifyError(combinedErrorMessage)
      }
    })()
  }, [getAssignmentById, getSubmissionList, classId, assignmentId])

  return dataAssignment && dataSubmissions ? (
    <>
      <PageHeader title='Danh sách bài làm' breadcrumbsItems={breadcrumbsItems} />
      <AssignmentDetailInformation assignment={dataAssignment} />
      <SubmissionTable submissions={dataSubmissions} />
    </>
  ) : (
    <Loading />
  )
}

export default SubmissionList
