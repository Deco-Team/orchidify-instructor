import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import SessionTable from './sessions/SessionTable'
import LearnerTable from './learners/LearnerTable'
import { ClassLearnerDto } from '~/data/class/class.dto'
import { SessionDto } from '~/data/course/course.dto'

interface CourseDetailResourceAndFeedbackProps {
  classId: string
  sessions: SessionDto[]
  learners: ClassLearnerDto[]
}

const SessionLearnerFeedbackList = ({ classId, sessions, learners }: CourseDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='classDetail'
        items={[
          { label: 'BUỔI HỌC', content: <SessionTable classId={classId} sessions={sessions} /> },
          { label: 'HỌC VIÊN', content: <LearnerTable classId={classId} learners={learners} /> }
        ]}
      />{' '}
    </Paper>
  )
}

export default SessionLearnerFeedbackList
