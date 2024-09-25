import { Box, Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { CourseTemplateStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'

interface CourseDetailHeaderProps {
  courseStatus: CourseTemplateStatus
  onDeleteButtonClick: () => void
}

const CourseDetailHeader = ({ courseStatus, onDeleteButtonClick }: CourseDetailHeaderProps) => {
  const breadcrumbsItems = [protectedRoute.courseTemplateList, protectedRoute.courseTemplateDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết mẫu khóa học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {courseStatus !== CourseTemplateStatus.REQUESTING ? <Button color='secondary'>Yêu cầu mở</Button> : null}
        {courseStatus !== CourseTemplateStatus.REQUESTING ? <Button color='warning'>Cập nhật</Button> : null}
        {courseStatus === CourseTemplateStatus.DRAFT ? (
          <Button color='error' onClick={onDeleteButtonClick}>
            Xóa
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default CourseDetailHeader
