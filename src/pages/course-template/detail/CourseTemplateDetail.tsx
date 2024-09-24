import Box from '@mui/material/Box/Box'
import CourseDetailHeader from './components/CourseTemplateDetailHeader'
import CourseDetailInformation from './components/CourseTemplateDetailInformation'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { useNavigate, useParams } from 'react-router-dom'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import CourseTemplateDetailResourceAndFeedback from './components/resource-and-feedback/CourseTemplateDetailResourceAndFeedback'
import { CourseTemplateDetailResponseDto } from '~/data/course-template/course-template.dto'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'

export default function CourseTemplateDetail() {
  const [data, setData] = useState<CourseTemplateDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseTemplateId = params.id
  const { getCourseTemplateById } = useCourseTemplateApi()

  useEffect(() => {
    if (courseTemplateId) {
      ;(async () => {
        const { data: courseTemplate, error: apiError } = await getCourseTemplateById(courseTemplateId)
        setData(courseTemplate)
        setError(apiError)
      })()
    }
  }, [courseTemplateId, getCourseTemplateById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.course.path, { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px' }}>
      <CourseDetailHeader courseStatus={data.status} />
      <CourseDetailInformation courseTemplate={data} />
      <CourseTemplateDetailResourceAndFeedback lessons={data.lessons} assignments={data.assignments} />
    </Box>
  ) : (
    <Loading />
  )
}
