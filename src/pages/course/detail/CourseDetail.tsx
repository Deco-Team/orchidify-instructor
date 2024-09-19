import Box from '@mui/material/Box/Box'
import CourseDetailHeader from './components/CourseDetailHeader'
import CourseDetailInformation from './components/CourseDetailInformation'
import { useEffect, useState } from 'react'
import { CourseDetailResponseDto } from '~/data/course.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import CourseDetailResourceAndLearner from './components/CourseDetailResourceAndLearner'

export default function CourseDetail() {
  const [data, setData] = useState<CourseDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.id
  const { getCourseById } = useCourseApi()

  useEffect(() => {
    if (courseId) {
      // eslint-disable-next-line prettier/prettier
      ;(async () => {
        const { data: course, error: apiError } = await getCourseById(courseId)
        setData(course)
        setError(apiError)
      })()
    }
  }, [courseId, getCourseById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px' }}>
      <CourseDetailHeader />
      <CourseDetailInformation course={data} />
      <CourseDetailResourceAndLearner course={data} />
    </Box>
  ) : (
    <Loading />
  )
}
