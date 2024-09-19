import { Box, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'

const AssignmentDetailHeader = () => {
  const items = [protectedRoute.course, protectedRoute.courseDetail, protectedRoute.assignmentDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết bài tập
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
    </Box>
  )
}

export default AssignmentDetailHeader
