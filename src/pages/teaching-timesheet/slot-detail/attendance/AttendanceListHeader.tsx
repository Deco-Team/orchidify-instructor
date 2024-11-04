import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface AttendanceListHeaderProps {
  title: string
  slotId: string
}

const AttendanceListHeader = ({ title, slotId }: AttendanceListHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.teachingTimesheet,
    { ...protectedRoute.slotDetail, path: protectedRoute.slotDetail.path.replace(':slotId', slotId) },
    { name: title, path: protectedRoute.attendanceList.path.replace(':slotId', slotId) }
  ]

  return <PageHeader title={title} breadcrumbsItems={breadcrumbsItems} />
}

export default AttendanceListHeader
