import { Grid, Paper, Box, Typography, Divider, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { TransactionByDateDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'
import isoWeek from 'dayjs/plugin/isoWeek'
import { formatCurrency } from '~/utils/format'

const fillWeekData = (data: TransactionByDateDto[], selectedDate: string) => {
  // Determine the start and end of the week based on the selectedDate
  const startDate = dayjs(selectedDate).startOf('isoWeek') // Start of the week (Monday)
  const endDate = startDate.add(6, 'days') // End of the week (Sunday)

  // Generate all dates in the week
  const allDates = []
  for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date = date.add(1, 'day')) {
    allDates.push(date.format('YYYY-MM-DD'))
  }

  // Create a map of the input data for quick lookup
  const dataMap = data.reduce((map: { [key: string]: TransactionByDateDto }, item) => {
    map[item._id] = item
    return map
  }, {})

  // Fill in missing dates with default values
  return allDates.map((date) => {
    return (
      dataMap[date] || {
        _id: date,
        payoutAmount: 0,
        date: dayjs(date).toISOString()
      }
    )
  })
}

const TransactionDetailChart = () => {
  dayjs.extend(isoWeek)

  const [transactionByDate, setTransactionByDate] = useState<TransactionByDateDto[] | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'))
  const { getTransactionByDate } = useReportApi()

  useEffect(() => {
    ;(async () => {
      if (!selectedDate) return
      const { data, error } = await getTransactionByDate(selectedDate)
      if (data) setTransactionByDate(fillWeekData(data, selectedDate))

      if (error) notifyError(error.message)
    })()
  }, [getTransactionByDate, selectedDate])

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Giao dịch</Typography>
          <TextField
            id='weekSelect'
            type='week'
            size='small'
            inputProps={{
              min: dayjs(new Date()).format('YYYY-[W]') + '01',
              max: dayjs(new Date()).format('YYYY-[W]') + dayjs(new Date()).isoWeek()
            }}
            value={dayjs(selectedDate).format('YYYY-[W]') + dayjs(selectedDate).isoWeek().toString().padStart(2, '0')}
            onChange={(e) => {
              const [year, week] = e.target.value.split('-W')
              setSelectedDate(
                dayjs().year(Number.parseInt(year)).isoWeek(parseInt(week)).startOf('isoWeek').format('YYYY-MM-DD')
              )
            }}
          />
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
                },
                formatter: (value: number) => {
                  return formatCurrency(value)
                }
              },
              stroke: {
                curve: 'smooth'
              },
              labels: [...(transactionByDate?.map((item) => dayjs(item.date).format('D/MM')) || [])],
              yaxis: {
                labels: {
                  style: {
                    fontSize: '12px',
                    colors: ['#304758']
                  },
                  formatter: (value: number) => {
                    return formatCurrency(value)
                  }
                }
              },
              colors: ['#2ec4b6'],
              tooltip: {
                enabled: true,
                intersect: false,
                hideEmptySeries: true
              }
            }}
            series={[
              {
                name: 'Giao dịch',
                data: useMemo(() => {
                  return transactionByDate?.map((item) => item.payoutAmount) || []
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
