import { Box, Button, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { CourseTemplateStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'

interface CourseDetailHeaderProps {
  courseStatus: CourseTemplateStatus
}

const CourseDetailHeader = ({ courseStatus }: CourseDetailHeaderProps) => {
  const items = [protectedRoute.courseTemplateList, protectedRoute.courseTemplateDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết mẫu khóa học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {courseStatus !== CourseTemplateStatus.REQUESTING ? <Button color='secondary'>Yêu cầu mở</Button> : null}
        {courseStatus !== CourseTemplateStatus.REQUESTING ? <Button color='warning'>Cập nhật</Button> : undefined}
        {courseStatus === CourseTemplateStatus.DRAFT ? <Button color='error'>Xóa</Button> : undefined}
      </Box>
    </Box>
  )
}

export default CourseDetailHeader
