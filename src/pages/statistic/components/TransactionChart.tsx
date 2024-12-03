import { Grid, Paper, Box, Typography, MenuItem, Select, Divider } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { TransactionByMonthDto } from '~/data/report/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'

const TransactionChart = () => {
  const [transactionByMonth, setTransactionByMonth] = useState<TransactionByMonthDto[] | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const { getTransactionByMonth } = useReportApi()

  useEffect(() => {
    ;(async () => {
      if (!selectedYear) return
      const { data, error } = await getTransactionByMonth(new Date().getFullYear())
      setTransactionByMonth(data)

      if (error) notifyError(error.message)
    })()
  }, [getTransactionByMonth, selectedYear])

  function processMonthlyData(data: TransactionByMonthDto[]) {
    // Create an array with 12 elements initialized to 0
    const monthlyArray = new Array(12).fill(0)

    // Populate the months based on the input data
    data.forEach((item: TransactionByMonthDto) => {
      const monthIndex = item.month - 1 // Convert month to 0-based index
      monthlyArray[monthIndex] = item.quantity
    })

    // Fill in missing months using the value from the previous month
    for (let i = 1; i < 12; i++) {
      if (monthlyArray[i] === 0) {
        monthlyArray[i] = monthlyArray[i - 1]
      }
    }

    return monthlyArray
  }

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
          <Typography variant='h6'>Số giao dịch</Typography>
          <Select size='small' displayEmpty value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <MenuItem value=''>Chọn năm</MenuItem>
            {[
              { name: '2022', value: '2022' },
              { name: '2023', value: '2023' },
              { name: '2024', value: '2024' }
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
              labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
              yaxis: {
                max: 50,
                min: 0,
                tickAmount: 5,
                labels: {
                  style: {
                    fontSize: '12px',
                    colors: ['#304758']
                  }
                }
              },
              colors: ['#2ec4b6']
            }}
            series={[
              {
                name: 'Số giao dịch',
                data: useMemo(() => {
                  return processMonthlyData(transactionByMonth || [])
                }, [transactionByMonth])
              }
            ]}
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default TransactionChart
