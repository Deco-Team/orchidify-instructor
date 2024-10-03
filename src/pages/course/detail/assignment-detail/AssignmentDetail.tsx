import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { AssignmentDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import AssignmentDetailHeader from './components/AssignmentDetailHeader'
import AssignmentDetailInformation from './components/AssignmentDetailInformation'

const AssignmentDetail = () => {
  const [data, setData] = useState<AssignmentDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.courseId
  const assignmentId = params.assignmentId
  const { getAssignmentById } = useCourseApi()

  useEffect(() => {
    if (courseId && assignmentId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: assignment, error: apiError } = await getAssignmentById(courseId, assignmentId)
        setData(assignment as unknown as AssignmentDto)
        setError(apiError)
      })()
    }
  }, [courseId, assignmentId, getAssignmentById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.courseDetail.path.replace(':id', courseId!), { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <AssignmentDetailHeader id={courseId!} />
      <AssignmentDetailInformation assignment={data} />
    </Box>
  ) : (
    <Loading />
  )
}

export default AssignmentDetail
