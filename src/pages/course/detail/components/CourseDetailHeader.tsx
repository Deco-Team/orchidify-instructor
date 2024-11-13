import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import { CourseStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'

interface CourseDetailHeaderProps {
  courseStatus: CourseStatus
  onDeleteButtonClick: () => void
  courseId: string
  isRequesting: boolean
}

const CourseDetailHeader = ({ courseStatus, onDeleteButtonClick, courseId, isRequesting }: CourseDetailHeaderProps) => {
  const breadcrumbsItems = [protectedRoute.courseList, protectedRoute.courseDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết khóa học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' alignItems={'center'} justifyContent='space-between' gap='1.5rem'>
        {isRequesting ? (
          <Typography variant='body1' color='warning' fontStyle={'italic'}>
            Đang chờ duyệt mở lớp học
          </Typography>
        ) : null}

        <Button color='secondary' component={Link} to={`/courses/${courseId}/publish-class`} disabled={isRequesting}>
          Yêu cầu mở
        </Button>
        {courseStatus === CourseStatus.DRAFT ? (
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
