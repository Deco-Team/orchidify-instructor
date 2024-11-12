import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import { CourseDetailResponseDto } from '~/data/course/course.dto'
import SessionTable from './resource/SessionTable'
import FeedbackTable from './resource/FeedbackTable'

interface CourseDetailResourceAndFeedbackProps {
  course: CourseDetailResponseDto
}

const CourseDetailResourceAndFeedback = ({ course }: CourseDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='courseDetail'
        items={[
          { label: 'BUỔI HỌC', content: <SessionTable courseId={course._id} sessions={course.sessions} /> },
          ...((course.ratingSummary?.totalCount ?? 0) > 0
            ? [
                {
                  label: 'ĐÁNH GIÁ',
                  content: <FeedbackTable courseId={course._id} />
                }
              ]
            : [])
        ]}
      />
    </Paper>
  )
}

export default CourseDetailResourceAndFeedback
