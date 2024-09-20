import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import { CourseDto } from '~/data/course/course.dto'

interface CourseDetailResourceAndLearnerProps {
  course: CourseDto
}

const CourseDetailResourceAndLearner = ({ course }: CourseDetailResourceAndLearnerProps) => {
  console.log(course)
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='courseDetail'
        items={[
          { label: 'BÀI HỌC', content: 'Bài học' },
          { label: 'HỌC VIÊN', content: 'Học viên' },
          { label: 'BÀI TẬP', content: 'Bài tập' }
        ]}
      />
    </Paper>
  )
}

export default CourseDetailResourceAndLearner
