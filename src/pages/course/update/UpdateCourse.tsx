import { useNavigate, useParams } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { StyledContainer } from './UpdateCourse.styled'
import PageHeader from '~/components/header/PageHeader'
import { CourseDetailResponseDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import UpdateCourseForm from './components/UpdateCourseForm'

const UpdateCourse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.id
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
        title='Cập nhật khóa học'
        breadcrumbsItems={[
          { name: protectedRoute.courseList.name, path: protectedRoute.courseList.path },
          {
            name: protectedRoute.courseDetail.name,
            path: protectedRoute.courseDetail.path.replace(':id', courseId || '')
          },
          { name: protectedRoute.updateCourse.name, path: protectedRoute.updateCourse.path }
        ]}
      />
      <UpdateCourseForm course={data} />
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default UpdateCourse
