import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { LessonDto } from '~/data/course-template/course-template.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'
import LessonDetailHeader from '~/pages/course/detail/lessson-detail/components/LessonDetailHeader'
import LessonDetailInformation from '~/pages/course/detail/lessson-detail/components/LessonDetailInformation'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'

const LessonDetail = () => {
  const [data, setData] = useState<LessonDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseTemplatesId = params.courseId
  const lessonId = params.lessonId
  const { getLessonById } = useCourseTemplateApi()
  useEffect(() => {
    if (courseTemplatesId && lessonId) {
      ;(async () => {
        const { data: lesson, error: apiError } = await getLessonById(courseTemplatesId, lessonId)
        setData(lesson as unknown as LessonDto)
        setError(apiError)
      })()
    }
  }, [courseTemplatesId, getLessonById, lessonId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <LessonDetailHeader type='template' id={courseTemplatesId!} />
      <LessonDetailInformation lesson={data} />
    </Box>
  ) : (
    <Loading />
  )
}

export default LessonDetail
