import { useParams } from 'react-router-dom'
import AssignmentDetailInformation from './components/AssignmentDetailInformation'
import { AssignmentDto } from '~/data/course/course.dto'
import SubmissionTable from './components/SubmissionTable'
import { protectedRoute } from '~/routes/routes'
import PageHeader from '~/components/header/PageHeader'
import { useEffect, useState } from 'react'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { AssignmentSubmissionItemResponseDto } from '~/data/class/class.dto'
import { Weekday } from '~/global/constants'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isoWeek)

const calculateDateList = (startDate: string, duration: number, weekdays: Weekday[]) => {
  const isoWeekday = {
    [Weekday.MONDAY]: 1,
    [Weekday.TUESDAY]: 2,
    [Weekday.WEDNESDAY]: 3,
    [Weekday.THURSDAY]: 4,
    [Weekday.FRIDAY]: 5,
    [Weekday.SATURDAY]: 6,
    [Weekday.SUNDAY]: 7
  }
  const startOfDate = dayjs(startDate).startOf('date')
  const endOfDate = startOfDate.add(duration, 'week').startOf('date')

  const classDates: dayjs.Dayjs[] = []
  let currentDate = startOfDate.clone()
  while (currentDate.isSameOrBefore(endOfDate)) {
    weekdays.forEach((weekday) => {
      const classDate = currentDate.isoWeekday(isoWeekday[weekday])
      if (classDate.isSameOrAfter(startOfDate) && classDate.isBefore(endOfDate)) {
        classDates.push(classDate)
      }
    })

    currentDate = currentDate.add(1, 'week')
  }

  return classDates
}

const SubmissionList = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId
  const assignmentId = params.assignmentId

  const { getClassById, getAssignmentById, getSubmissionList } = useClassApi()
  const [dataAssignment, setDataAssignment] = useState<
    (AssignmentDto & { minDeadline: string; maxDeadline: string }) | null
  >(null)
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
      const [
        { data: classData, error: classError },
        { data: assignment, error: assignmentError },
        { data: submissions, error: submissionsError }
      ] = await Promise.all([
        getClassById(classId!),
        getAssignmentById(classId!, assignmentId!),
        getSubmissionList(classId!, assignmentId!)
      ])

      if (classData && assignment) {
        const classDateList = calculateDateList(classData.startDate, classData.duration, classData.weekdays)
        const minDeadline = dayjs().isAfter(classDateList[assignment.sessionNumber - 1].set('hour', 0))
          ? dayjs().toISOString()
          : classDateList[assignment.sessionNumber - 1].set('hour', 0).toISOString()
        const maxDeadline = classDateList[classDateList.length - 1]
          .set('hour', 23)
          .set('minute', 59)
          .set('second', 59)
          .toISOString()
        setDataAssignment({ ...assignment, minDeadline, maxDeadline })
      }

      setDataSubmissions(submissions)

      const combinedErrorMessage = [classError?.message, assignmentError?.message, submissionsError?.message]
        .filter(Boolean)
        .join(' | ')

      if (combinedErrorMessage) {
        notifyError(combinedErrorMessage)
      }
    })()
  }, [getAssignmentById, getSubmissionList, classId, assignmentId, getClassById])

  return dataAssignment && dataSubmissions ? (
    <>
      <PageHeader title='Danh sách bài làm' breadcrumbsItems={breadcrumbsItems} />
      <AssignmentDetailInformation classId={classId!} assignment={dataAssignment} />
      <SubmissionTable submissions={dataSubmissions} />
    </>
  ) : (
    <Loading />
  )
}

export default SubmissionList
