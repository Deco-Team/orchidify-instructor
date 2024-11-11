import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import SessionTable from './sessions/SessionTable'
import LearnerTable from './learners/LearnerTable'
import { ClassDetailResponseDto } from '~/data/class/class.dto'
import FeedbackTable from './feedbacks/FeedbackTable'

interface CourseDetailResourceAndFeedbackProps {
  classDetail: ClassDetailResponseDto
}

const SessionLearnerFeedbackList = ({ classDetail }: CourseDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='classDetail'
        items={[
          { label: 'BUỔI HỌC', content: <SessionTable classId={classDetail._id} sessions={classDetail.sessions} /> },
          { label: 'HỌC VIÊN', content: <LearnerTable classId={classDetail._id} learners={classDetail.learners} /> },
          ...((classDetail.ratingSummary?.totalCount ?? 0) > 0
            ? [
                {
                  label: 'ĐÁNH GIÁ',
                  content: <FeedbackTable classId={classDetail._id} />
                }
              ]
            : [])
        ]}
      />{' '}
    </Paper>
  )
}

export default SessionLearnerFeedbackList
