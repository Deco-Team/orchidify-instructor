import { Box, Divider, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { RevenueSumByMonthDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'
import ReactApexChart from 'react-apexcharts'
import { formatCurrency } from '~/utils/format'

const RevenueChart = () => {
  const [revenueSumByMonth, setRevenueSumByMonth] = useState<RevenueSumByMonthDto[] | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const { getRevenueSumByMonth } = useReportApi()

  useEffect(() => {
    ;(async () => {
      if (!selectedYear) return
      const { data, error } = await getRevenueSumByMonth(new Date().getFullYear())
      setRevenueSumByMonth(data)

      if (error) notifyError(error.message)
    })()
  }, [getRevenueSumByMonth, selectedYear])

  return (
    <Grid item xs={12}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Doanh thu</Typography>
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
                id: 'revenue-by-month',
                type: 'area',
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                },
                parentHeightOffset: 0,
                animations: {
                  enabled: true
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
              yaxis: {
                max:
                  Math.ceil(
                    Math.max(...(revenueSumByMonth?.map((item) => item.revenue.total) || []), 1000000) / 1000000
                  ) * 1000000,
                min: 0,
                tickAmount: 5,
                labels: {
                  formatter: (value: number) => {
                    return formatCurrency(value)
                  },
                  style: {
                    fontSize: '12px',
                    colors: ['#304758']
                  }
                }
              },
              markers: {
                size: 5
              },
              grid: {
                xaxis: {
                  lines: {
                    show: true
                  }
                },
                strokeDashArray: 5
              },
              tooltip: {
                enabled: true,
                intersect: false,
                y: {
                  formatter: (value: number) => {
                    return formatCurrency(value)
                  }
                }
              },
              colors: ['#2ec4b6']
            }}
            series={[
              {
                name: 'Doanh thu',
                data: useMemo(() => {
                  return revenueSumByMonth?.map((item) => item.revenue.total) || []
                }, [revenueSumByMonth])
              }
            ]}
            height={350}
            type='area'
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default RevenueChart
