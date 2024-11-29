import { Box, Divider, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { LearnerEnrolledByMonthDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'
import ReactApexChart from 'react-apexcharts'

const LearnerChart = () => {
  const [learnerEnrolledByMonth, setLearnerEnrolledByMonth] = useState<LearnerEnrolledByMonthDto[] | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const { getLeanerEnrolledByMonth } = useReportApi()

  useEffect(() => {
    ;(async () => {
      if (!selectedYear) return
      const { data, error } = await getLeanerEnrolledByMonth(selectedYear)
      setLearnerEnrolledByMonth(data)

      if (error) notifyError(error.message)
    })()
  }, [getLeanerEnrolledByMonth, selectedYear])

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Số học viên đã tham gia</Typography>
          <Select size='small' displayEmpty value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <MenuItem value=''>Chọn năm</MenuItem>
            {[{ name: '2024', value: '2024' }].map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <ReactApexChart
            options={{
              chart: {
                id: 'learner-enrolled-by-month',
                type: 'bar',
                toolbar: {
                  show: false
                },
                parentHeightOffset: 0,
                animations: {
                  enabled: true
                }
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: 'top'
                  }
                }
              },
              dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ['#304758']
                }
              },
              grid: {
                xaxis: {
                  lines: {
                    show: true
                  }
                },
                strokeDashArray: 5
              },

              xaxis: {
                categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
              },
              yaxis: {
                max:
                  Math.ceil(
                    Math.max(...(learnerEnrolledByMonth?.map((item) => item.learner.quantity) || []), 10) / 10
                  ) * 10,
                min: 0,
                tickAmount: 5
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
              tooltip: {
                enabled: true,
                intersect: false,
                hideEmptySeries: true
              },
              colors: ['#2ec4b6']
            }}
            series={[
              {
                name: 'Số học viên',
                data: useMemo(() => {
                  return learnerEnrolledByMonth?.map((item) => item.learner.quantity) || []
                }, [learnerEnrolledByMonth])
              }
            ]}
            height={350}
            type='bar'
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default LearnerChart
