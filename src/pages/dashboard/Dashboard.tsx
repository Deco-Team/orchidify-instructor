import { Grid, Typography } from '@mui/material'
import StatisticSection from './components/StatisticSection'
import useAuth from '~/auth/useAuth'
import TimesheetSection from './components/TimesheetSection'
import ClassChart from './components/ClassChart'
import LearnerChart from './components/LearnerChart'
import ClassRequestSection from './components/ClassRequestSection'
import CourseComboSection from './components/CourseComboSection'
import RevenueChart from './components/RevenueChart'

export default function Dashboard() {
  const { userTokenPayload } = useAuth()

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={'bold'}>
          Xin chào, {userTokenPayload?.name}
        </Typography>
      </Grid>

      <StatisticSection />
      <TimesheetSection />
      <ClassChart />
      <LearnerChart />
      <ClassRequestSection />
      <CourseComboSection />
      <RevenueChart />
    </Grid>
  )
}
