import { ClassOutlined, MenuBookOutlined, NoteAltOutlined, TrendingUpOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { TotalSummaryDto } from '~/data/report/report.dto'
import { ReportType } from '~/global/constants'
import { useReportApi } from '~/hooks/api/useReportApi'
import { formatCurrencyDashboard } from '~/utils/format'
import { notifyError } from '~/utils/toastify'
import { CardHeader } from './CardHeader'

const StatisticSection = () => {
  const [totalSummary, setTotalSummary] = useState<TotalSummaryDto[] | null>(null)
  const { getTotalSumary } = useReportApi()

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getTotalSumary()
      setTotalSummary(data)

      if (error) notifyError(error.message)
    })()
  }, [getTotalSumary])

  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <CardHeader
          title={totalSummary?.find((item) => item.type === ReportType.CourseSum)?.data.ACTIVE?.quantity || 0}
          body='khóa học đang công khai'
          color='#20C017'
          Icon={MenuBookOutlined}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardHeader
          title={totalSummary?.find((item) => item.type === ReportType.ClassSum)?.data.IN_PROGRESS?.quantity || 0}
          body='lớp học đang diễn ra'
          color='#5BADD0'
          Icon={ClassOutlined}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardHeader
          title={totalSummary?.find((item) => item.type === ReportType.ClassRequestSum)?.data.PENDING?.quantity || 0}
          body='yêu cầu đang chờ xử lí'
          color='#FFCF22'
          Icon={NoteAltOutlined}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardHeader
          title={formatCurrencyDashboard(
            totalSummary?.find((item) => item.type === ReportType.RevenueSum)?.data.total || 0
          )}
          body='doanh thu'
          color='#F66868'
          Icon={TrendingUpOutlined}
        />
      </Grid>
    </>
  )
}

export default StatisticSection
