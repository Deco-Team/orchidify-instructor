import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { formatClassStatus } from '~/utils/format'
import { ClassByStatusDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import { Link } from 'react-router-dom'

const ClassChart = () => {
  const [classByStatus, setClassByStatus] = useState<ClassByStatusDto | null>(null)

  const { getClassByStatus } = useReportApi()

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getClassByStatus()
      setClassByStatus(data)

      if (error) notifyError(error.message)
    })()
  }, [getClassByStatus])

  return (
    <Grid item xs={12} md={6} alignItems={'stretch'}>
      <Paper elevation={2} sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Lớp học</Typography>
          <Typography variant='caption' sx={{ color: 'inherit' }} component={Link} to={protectedRoute.classList.path}>
            Xem tất cả
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Chart
            options={{
              chart: {
                id: 'class-by-status',
                type: 'pie',
                toolbar: {
                  show: false
                },
                parentHeightOffset: 0,
                animations: {
                  enabled: true
                }
              },
              labels: classByStatus?.docs.map((item) => formatClassStatus(item.status)) || [],
              legend: {
                position: 'bottom',
                fontSize: '12px',
                labels: {
                  colors: '#333333'
                },
                itemMargin: {
                  horizontal: 12
                }
              },
              dataLabels: {
                enabled: true,
                dropShadow: {
                  enabled: false
                },
                formatter: function (val, opts) {
                  return `${opts.w.globals.series[opts.seriesIndex]} (${Number(val).toFixed(1)}%)`
                }
              },
              states: {
                hover: {
                  filter: {
                    type: 'none'
                  }
                },
                active: {
                  allowMultipleDataPointsSelection: false,
                  filter: {
                    type: 'none'
                  }
                }
              },
              colors: ['#FFCF22', '#20C017', '#F66868', '#707070']
            }}
            series={classByStatus?.docs.map((item) => item.quantity) || []}
            height={350}
            type='pie'
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default ClassChart
