import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import { AssignmentDto, LessonDto } from '~/data/course-template/course-template.dto'
import LessonTemplateTable from './resource/LessonTemplateTable'
import AssignmentTemplateTable from './resource/AssignmentTemplateTable'

interface CourseTemplateDetailResourceAndFeedbackProps {
  lessons: LessonDto[]
  assignments: AssignmentDto[]
}

const CourseTemplateDetailResourceAndFeedback = ({
  lessons,
  assignments
}: CourseTemplateDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='courseTemplateDetail'
        items={[
          { label: 'BÀI HỌC', content: <LessonTemplateTable lessons={lessons} /> },
          { label: 'BÀI TẬP', content: <AssignmentTemplateTable assignments={assignments} /> }
        ]}
      />
    </Paper>
  )
}

export default CourseTemplateDetailResourceAndFeedback
