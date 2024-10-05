import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface LessonDetailHeaderProps {
  id: string
}

const LessonDetailHeader = ({ id }: LessonDetailHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.courseList,
    {
      ...protectedRoute.courseDetail,
      path: protectedRoute.courseDetail.path.replace(':id', id)
    },
    protectedRoute.courseLessonDetail
  ]

  return <PageHeader title='Chi tiết bài học' breadcrumbsItems={breadcrumbsItems} />
}

export default LessonDetailHeader
