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
import { LessonDto } from '~/data/course/course.dto'

const LessonDetail = () => {
  const [data, setData] = useState<LessonDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.courseId
  const lessonId = params.lessonId
  const { getLessonById } = useCourseApi()

  useEffect(() => {
    if (courseId && lessonId) {
      ;(async () => {
        const { data: lesson, error: apiError } = await getLessonById(courseId, lessonId)
        setData(lesson as unknown as LessonDto)
        setError(apiError)
      })()
    }
  }, [courseId, getLessonById, lessonId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <LessonDetailHeader id={courseId!} />
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
