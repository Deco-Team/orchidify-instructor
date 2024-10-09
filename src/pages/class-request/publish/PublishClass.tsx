import { useParams } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import PublishClassForm from './components/PublishClassForm'
import { StyledContainer } from './PublishClass.styled'

const PublishClass = () => {
  const params = useParams()
  const courseId = params.courseId

  return (
    <StyledContainer>
      <PageHeader
        title='Yêu cầu mở lớp học'
        breadcrumbsItems={[
          { name: 'Khóa học', path: '/courses' },
          { name: 'Chi tiết khóa học', path: `/courses/${courseId}` },
          { name: 'Yêu cầu mở lớp học', path: `/courses/${courseId}/publish-class` }
        ]}
      />
      <PublishClassForm courseId={courseId}/>
    </StyledContainer>
  )
}

export default PublishClass
