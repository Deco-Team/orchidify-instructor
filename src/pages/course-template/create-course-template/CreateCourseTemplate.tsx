import { protectedRoute } from '~/routes/routes'
import { StyledContainer } from './CreateCourseTemplate.styled'
import CreateCourseTemplateForm from './components/CreateCourseTemplateForm'
import PageHeader from '~/components/header/PageHeader'

const CreateCourseTemplate = () => {
  return (
    <StyledContainer>
      <PageHeader
        title='Tạo mẫu khóa học'
        breadcrumbsItems={[
          { name: protectedRoute.courseTemplateList.name, path: protectedRoute.courseTemplateList.path },
          { name: protectedRoute.createCourseTemplate.name, path: protectedRoute.createCourseTemplate.path }
        ]}
      />
      <CreateCourseTemplateForm />
    </StyledContainer>
  )
}

export default CreateCourseTemplate
