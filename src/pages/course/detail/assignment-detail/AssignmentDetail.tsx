import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorResponseDto } from '~/data/error.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { BaseAssignmentDto } from '~/data/assignment.dto'
import AssignmentDetailHeader from './components/AssignmentDetailHeader'
import AssignmentDetailInformation from './components/AssignmentDetailInformation'

const AssignmentDetail = () => {
  const [data, setData] = useState<BaseAssignmentDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.courseId
  const assignmentId = params.assignmentId
  const { getAssignmentById } = useCourseApi()
  useEffect(() => {
    if (courseId && assignmentId) {
      ;(async () => {
        const { data: assignment, error: apiError } = await getAssignmentById(courseId, assignmentId)
        setData(assignment as unknown as BaseAssignmentDto)
        setError(apiError)
      })()
    }
  }, [courseId, assignmentId, getAssignmentById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <AssignmentDetailHeader courseId={courseId!} />
      <AssignmentDetailInformation assignment={data} />
      <Button size='large' sx={{ width: 'fit-content', alignSelf: 'center' }} color='primary'>
        Bài làm học viên
      </Button>
    </Box>
  ) : (
    <Loading />
  )
}

export default AssignmentDetail
