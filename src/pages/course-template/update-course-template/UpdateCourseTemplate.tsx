import { useNavigate, useParams } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { StyledContainer } from './UpdateCourseTemplate.styled'
import PageHeader from '~/components/header/PageHeader'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'
import { CourseTemplateDetailResponseDto } from '~/data/course-template/course-template.dto'
import UpdateCourseTemplateForm from './components/UpdateCourseTemplateForm'

const UpdateCourseTemplate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const courseTemplateId = params.id
  const [data, setData] = useState<CourseTemplateDetailResponseDto | null>(null)
  const { getCourseTemplateById } = useCourseTemplateApi()

  useEffect(() => {
    if (courseTemplateId) {
      ;(async () => {
        const { data: course, error: apiError } = await getCourseTemplateById(courseTemplateId)
        setData(course)
        if (apiError) {
          notifyError(apiError.message)
          navigate(protectedRoute.courseDetail.path, { replace: true })
        }
      })()
    }
  }, [courseTemplateId, getCourseTemplateById, navigate])

  return data ? (
    <StyledContainer>
      <PageHeader
        title='Cập nhật mẫu khóa học'
        breadcrumbsItems={[
          { name: protectedRoute.courseTemplateList.name, path: protectedRoute.courseTemplateList.path },
          {
            name: protectedRoute.courseTemplateDetail.name,
            path: protectedRoute.courseTemplateDetail.path.replace(':id', courseTemplateId || '')
          },
          { name: protectedRoute.updateCourseTemplate.name, path: protectedRoute.updateCourseTemplate.path }
        ]}
      />
      <UpdateCourseTemplateForm courseTemplate={data} />
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default UpdateCourseTemplate
