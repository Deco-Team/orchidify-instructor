import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import 'react-day-picker/style.css'
import ClassRequesTable from './table/ClassRequestTable'

const ClassRequestSection = () => {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Yêu cầu lớp học đang chờ</Typography>
          <Typography
            variant='caption'
            sx={{ color: 'inherit' }}
            component={Link}
            to={protectedRoute.classRequestList.path}
          >
            Xem tất cả
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: 3 }}>
          <ClassRequesTable />
        </Box>
      </Paper>
    </Grid>
  )
}

export default ClassRequestSection
