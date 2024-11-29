import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import 'react-day-picker/style.css'
import CourseComboTable from './table/CourseComboTable'

const CourseComboSection = () => {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Combo khóa học</Typography>
          <Typography
            variant='caption'
            sx={{ color: 'inherit' }}
            component={Link}
            to={protectedRoute.courseComboList.path}
          >
            Xem tất cả
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: 3 }}>
          <CourseComboTable />
        </Box>
      </Paper>
    </Grid>
  )
}

export default CourseComboSection
