import { Box, Button, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'
const CourseDetailHeader = () => {
  const items = [protectedRoute.course, protectedRoute.courseDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết khóa học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        <Button color='secondary'>Yêu cầu mở</Button>
        <Button color='warning'>Cập nhật</Button>
        <Button color='error'>Xóa</Button>
      </Box>
    </Box>
  )
}

export default CourseDetailHeader
