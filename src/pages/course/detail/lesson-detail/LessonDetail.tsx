import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { LessonDto } from '~/data/course/course.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import LessonDetailHeader from './components/LessonDetailHeader'
import LessonDetailInformation from './components/LessonDetailInformation'

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
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: lesson, error: apiError } = await getLessonById(courseId, lessonId)
        setData(lesson as unknown as LessonDto)
        setError(apiError)
      })()
    }
  }, [courseId, getLessonById, lessonId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.courseDetail.path.replace(':id', courseId!), { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <LessonDetailHeader id={courseId!} />
      <LessonDetailInformation lesson={data} />
    </Box>
  ) : (
    <Loading />
  )
}

export default LessonDetail
