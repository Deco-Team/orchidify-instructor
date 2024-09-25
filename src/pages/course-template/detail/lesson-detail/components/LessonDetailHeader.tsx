import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface LessonDetailHeaderProps {
  id: string
}

const LessonDetailHeader = ({ id }: LessonDetailHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.courseTemplateList,
    {
      ...protectedRoute.courseTemplateDetail,
      path: protectedRoute.courseTemplateDetail.path.replace(':id', id)
    },
    protectedRoute.lessonDetail
  ]

  return <PageHeader title='Chi tiết bài học' breadcrumbsItems={breadcrumbsItems} />
}

export default LessonDetailHeader
