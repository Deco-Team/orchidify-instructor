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
  const { getCourseById } = useCourseApi()
  useEffect(() => {
    if (courseId && assignmentId) {
      // eslint-disable-next-line prettier/prettier
      ;(async () => {
        const { data: course, error: apiError } = await getCourseById(courseId)
        setData(course?.assignments.filter((value) => value._id === assignmentId)[0] as unknown as BaseAssignmentDto)
        setError(apiError)
      })()
    }
  }, [courseId, data, getCourseById, assignmentId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <AssignmentDetailHeader />
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
