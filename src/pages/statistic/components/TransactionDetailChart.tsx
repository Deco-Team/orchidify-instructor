import { Grid, Paper, Box, Typography, Divider, MenuItem, Select } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { TransactionByDateDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'

const TransactionDetailChart = () => {
  const [transactionByDate, setTransactionByDate] = useState<TransactionByDateDto[] | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(dayjs(new Date()).format('DD-MM-YYYY'))
  const { getTransactionByDate } = useReportApi()

  useEffect(() => {
    ;(async () => {
      if (!selectedDate) return
      const { data, error } = await getTransactionByDate(dayjs(new Date()).format('YYYY-MM-DD'))
      setTransactionByDate(data)

      if (error) notifyError(error.message)
    })()
  }, [getTransactionByDate, selectedDate])

  function convertToWeeklyArray(data: TransactionByDateDto[]) {
    // Create a 7-element array initialized with zeros
    const weeklyArray = Array(7).fill(0)

    // Map day of the week (0 for Monday, 6 for Sunday) to array indices
    const dayIndex = (date: string) => {
      const day = new Date(date).getDay() // Get day (0 is Sunday, 6 is Saturday)
      return day === 0 ? 6 : day - 1 // Convert Sunday to index 6 and adjust others
    }

    // Iterate over the input data and populate the array
    data.forEach((item) => {
      const index = dayIndex(item.date)
      weeklyArray[index] = item.payoutAmount || 0 // Use payoutAmount or 0 as fallback
    })

    return weeklyArray
  }

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Giao dịch</Typography>
          <Select size='small' displayEmpty value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <MenuItem value=''>Chọn ngày</MenuItem>
            {[
              {
                name: dayjs(new Date()).add(-56, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-56, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-49, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-49, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-42, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-42, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-35, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-35, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-28, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-28, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-21, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-21, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-14, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-14, 'day').format('DD-MM-YYYY')
              },
              {
                name: dayjs(new Date()).add(-7, 'day').format('DD-MM-YYYY'),
                value: dayjs(new Date()).add(-7, 'day').format('DD-MM-YYYY')
              },
              { name: dayjs(new Date()).format('DD-MM-YYYY'), value: dayjs(new Date()).format('DD-MM-YYYY') }
            ].map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <ReactApexChart
            type='bar'
            options={{
              chart: {
                stacked: true,
                id: 'transaction-by-month',
                type: 'bar',
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
              labels: ['T2', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
              yaxis: {
                labels: {
                  style: {
                    fontSize: '12px',
                    colors: ['#304758']
                  }
                }
              },
              colors: ['#ef5350']
            }}
            series={[
              {
                name: 'Giao dịch',
                data: useMemo(() => {
                  return convertToWeeklyArray(transactionByDate || [])
                }, [transactionByDate])
              }
            ]}
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default TransactionDetailChart
