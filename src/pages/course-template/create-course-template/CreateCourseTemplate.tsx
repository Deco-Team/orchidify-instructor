import { Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'
import { HeaderWrapper, StyledContainer, TitleWrapper } from './CreateCourseTemplate.styled'
import CreateCourseTemplateForm from './components/CreateCourseTemplateForm'

const CreateCourseTemplate = () => {
  return (
    <StyledContainer>
      <TitleWrapper>
        <HeaderWrapper>
          <Typography variant='h4' fontWeight='bold'>
            Tạo mẫu khóa học
          </Typography>
          <Breadcrumbs
            items={[
              { name: protectedRoute.courseTemplateList.name, path: protectedRoute.courseTemplateList.path },
              { name: protectedRoute.createCourseTemplate.name, path: protectedRoute.createCourseTemplate.path }
            ]}
          />
        </HeaderWrapper>
      </TitleWrapper>
      <CreateCourseTemplateForm />
    </StyledContainer>
  )
}

export default CreateCourseTemplate
