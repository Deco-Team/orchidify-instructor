import { Grid, Typography } from '@mui/material'
import RevenueChart from '../dashboard/components/RevenueChart'
import TransactionChart from './components/TransactionChart'
import TransactionDetailChart from './components/TransactionDetailChart'

const Statistic = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight={'bold'}>
          Thống kê
        </Typography>
      </Grid>
      <RevenueChart />
      <TransactionChart />
      <TransactionDetailChart />
    </Grid>
  )
}

export default Statistic
