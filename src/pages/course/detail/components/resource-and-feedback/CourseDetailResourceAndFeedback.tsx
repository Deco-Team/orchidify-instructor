import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import { AssignmentDto, LessonDto } from '~/data/course/course.dto'
import LessonTable from './resource/LessonTable'
import AssignmentTable from './resource/AssignmentTable'

interface CourseDetailResourceAndFeedbackProps {
  lessons: LessonDto[]
  assignments: AssignmentDto[]
  courseId: string
}

const CourseDetailResourceAndFeedback = ({ lessons, assignments, courseId }: CourseDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='courseDetail'
        items={[
          { label: 'BÀI HỌC', content: <LessonTable courseId={courseId} lessons={lessons} /> },
          {
            label: 'BÀI TẬP',
            content: <AssignmentTable courseId={courseId} assignments={assignments} />
          }
        ]}
      />
    </Paper>
  )
}

export default CourseDetailResourceAndFeedback
