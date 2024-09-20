import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { HeaderWrapper, StyledContainer, TitleWrapper } from './CreateCourse.styled'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'
import { useState } from 'react'
import CreateCourseForm from './components/CreateCourseForm'

const CreateCourse = () => {
  const [type, setType] = useState<'course' | 'courseCombo'>('course')

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newType: 'course' | 'courseCombo') => {
    if (newType) setType(newType)
  }

  return (
    <StyledContainer>
      <TitleWrapper>
        <HeaderWrapper>
          <Typography variant='h4' fontWeight='bold'>
            Tạo khóa học
          </Typography>
          <Breadcrumbs
            items={[
              { name: protectedRoute.course.name, path: protectedRoute.course.path },
              { name: protectedRoute.createCourse.name, path: protectedRoute.createCourse.path }
            ]}
          />
        </HeaderWrapper>
        <ToggleButtonGroup color='primary' value={type} exclusive onChange={handleChange} size='small'>
          <ToggleButton value='course'>Tạo khóa học</ToggleButton>
          <ToggleButton value='courseCombo'>Tạo combo</ToggleButton>
        </ToggleButtonGroup>
      </TitleWrapper>
      <CreateCourseForm />
    </StyledContainer>
  )
}

export default CreateCourse
