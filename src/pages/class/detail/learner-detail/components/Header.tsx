import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface HeadersProps {
  classId: string
}

const Headers = ({ classId }: HeadersProps) => {
  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId)
    },
    protectedRoute.classLearnerDetail
  ]

  return <PageHeader title='Thông tin học viên' breadcrumbsItems={breadcrumbsItems} />
}

export default Headers
