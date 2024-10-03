import { protectedRoute } from '~/routes/routes'
import { StyledContainer } from './CreateCourse.styled'
import CreateCourseForm from './components/CreateCourseForm'
import PageHeader from '~/components/header/PageHeader'

const CreateCourse = () => {
  return (
    <StyledContainer>
      <PageHeader title='Tạo khóa học' breadcrumbsItems={[protectedRoute.courseList, protectedRoute.createCourse]} />
      <CreateCourseForm />
    </StyledContainer>
  )
}

export default CreateCourse
