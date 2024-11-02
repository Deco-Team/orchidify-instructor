import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface TakingAttendanceHeaderProps {
  slotId: string
}

const TakingAttendanceHeader = ({ slotId }: TakingAttendanceHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.teachingTimesheet,
    { ...protectedRoute.slotDetail, path: protectedRoute.slotDetail.path.replace(':slotId', slotId) },
    { ...protectedRoute.attendanceList, path: protectedRoute.attendanceList.path.replace(':slotId', slotId) },
    protectedRoute.takingAttendance
  ]
  return <PageHeader title='Điểm danh' breadcrumbsItems={breadcrumbsItems} />
}

export default TakingAttendanceHeader
