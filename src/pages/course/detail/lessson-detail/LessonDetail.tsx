import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import LessonDetailHeader from './components/LessonDetailHeader'
import LessonDetailInformation from './components/LessonDetailInformation'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorResponseDto } from '~/data/error.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { BaseLessonDto } from '~/data/lesson.dto'

const LessonDetail = () => {
  const [data, setData] = useState<BaseLessonDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.courseId
  const lessonId = params.lessonId
  const { getCourseById } = useCourseApi()
  useEffect(() => {
    if (courseId && lessonId) {
      // eslint-disable-next-line prettier/prettier
      ;(async () => {
        const { data: course, error: apiError } = await getCourseById(courseId)
        setData(course?.lessons.filter((value) => value._id === lessonId)[0] as unknown as BaseLessonDto)
        setError(apiError)
      })()
    }
  }, [courseId, data, getCourseById, lessonId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <LessonDetailHeader />
      <LessonDetailInformation lesson={data} />
      <Button size='large' sx={{ width: 'fit-content', alignSelf: 'center' }} color='primary'>
        Tải lên tài nguyên
      </Button>
    </Box>
  ) : (
    <Loading />
  )
}

export default LessonDetail
