import { Box, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'

interface LessonDetailHeaderProps {
  courseId: string
}

const LessonDetailHeader = ({ courseId }: LessonDetailHeaderProps) => {
  const items = [
    protectedRoute.course,
    { ...protectedRoute.courseDetail, path: protectedRoute.courseDetail.path.replace(':id', courseId) },
    protectedRoute.lessonDetail
  ]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết bài học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
    </Box>
  )
}

export default LessonDetailHeader
