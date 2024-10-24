import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import PublishClassForm from './components/PublishClassForm'
import { StyledContainer } from './PublishClass.styled'
import { useEffect, useState } from 'react'
import { CourseDetailResponseDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import Loading from '~/components/loading/Loading'

const PublishClass = () => {
  const params = useParams()
  const courseId = params.courseId
  const navigate = useNavigate()
  const [data, setData] = useState<CourseDetailResponseDto | null>(null)
  const { getCourseById } = useCourseApi()

  useEffect(() => {
    if (courseId) {
      ;(async () => {
        const { data: course, error: apiError } = await getCourseById(courseId)
        setData(course)
        if (apiError) {
          notifyError(apiError.message)
          navigate(protectedRoute.courseDetail.path.replace(':id', courseId), { replace: true })
        }
      })()
    }
  }, [courseId, getCourseById, navigate])

  return data ? (
    <StyledContainer>
      <PageHeader
        title='Yêu cầu mở lớp học'
        breadcrumbsItems={[
          { name: 'Khóa học', path: '/courses' },
          { name: 'Chi tiết khóa học', path: `/courses/${courseId}` },
          { name: 'Yêu cầu mở lớp học', path: `/courses/${courseId}/publish-class` }
        ]}
      />
      <PublishClassForm courseId={data._id} duration={data.duration} />
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default PublishClass
