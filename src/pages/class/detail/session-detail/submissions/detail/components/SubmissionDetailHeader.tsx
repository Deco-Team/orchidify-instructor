import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface SubmissionDetailHeaderProps {
  classId: string
  sessionId: string
  assignmentId: string
}

const SubmissionDetailHeader = ({ classId, sessionId, assignmentId }: SubmissionDetailHeaderProps) => {
  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId)
    },
    {
      ...protectedRoute.classSessionDetail,
      path: protectedRoute.classSessionDetail.path.replace(':classId', classId).replace(':sessionId', sessionId)
    },
    {
      ...protectedRoute.classSubmissionList,
      path: protectedRoute.classSubmissionList.path
        .replace(':classId', classId)
        .replace(':sessionId', sessionId)
        .replace(':assignmentId', assignmentId)
    },
    protectedRoute.classSubmissionDetail
  ]

  return <PageHeader title='Chi tiết bài làm' breadcrumbsItems={breadcrumbsItems} />
}

export default SubmissionDetailHeader
