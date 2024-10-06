import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import { CourseStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'

interface CourseDetailHeaderProps {
  courseStatus: CourseStatus
  onDeleteButtonClick: () => void
  courseId: string
}

const CourseDetailHeader = ({ courseStatus, onDeleteButtonClick, courseId }: CourseDetailHeaderProps) => {
  const breadcrumbsItems = [protectedRoute.courseList, protectedRoute.courseDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết khóa học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {courseStatus !== CourseStatus.REQUESTING ? <Button color='secondary'>Yêu cầu mở</Button> : null}
        {courseStatus !== CourseStatus.REQUESTING ? (
          <Button color='warning' component={Link} to={`/courses/${courseId}/update`}>
            Cập nhật
          </Button>
        ) : null}
        {courseStatus === CourseStatus.DRAFT ? (
          <Button color='error' onClick={onDeleteButtonClick}>
            Xóa
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default CourseDetailHeader
