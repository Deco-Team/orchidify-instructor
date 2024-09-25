import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface AssignmentDetailHeaderProps {
  id: string
}

const AssignmentDetailHeader = ({ id }: AssignmentDetailHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.courseTemplateList,
    {
      ...protectedRoute.courseTemplateDetail,
      path: protectedRoute.courseTemplateDetail.path.replace(':id', id)
    },
    protectedRoute.assignmentDetail
  ]
  return <PageHeader title='Chi tiết bài tập' breadcrumbsItems={breadcrumbsItems} />
}

export default AssignmentDetailHeader
