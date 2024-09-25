import { Box, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'

interface AssignmentDetailHeaderProps {
  id: string
  type?: string
}

const AssignmentDetailHeader = ({ id, type = 'course' }: AssignmentDetailHeaderProps) => {
  const items =
    type === 'course'
      ? [
          protectedRoute.course,
          { ...protectedRoute.courseDetail, path: protectedRoute.courseDetail.path.replace(':id', id) },
          protectedRoute.assignmentDetail
        ]
      : [
          protectedRoute.courseTemplateList,
          {
            ...protectedRoute.courseTemplateDetail,
            path: protectedRoute.courseTemplateDetail.path.replace(':id', id)
          },
          protectedRoute.assignmentDetail
        ]
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
