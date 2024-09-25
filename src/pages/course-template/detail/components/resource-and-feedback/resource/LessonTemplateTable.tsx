import Table from '~/components/table/Table'
import { lessonTemplateColumns } from './lesson-template-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { LessonDto } from '~/data/course-template/course-template.dto'

interface LessonTemplateTableProps {
  lessons: LessonDto[]
}

const LessonTemplateTable = ({ lessons }: LessonTemplateTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách bài học'
      tableOptions={{
        columns: lessonTemplateColumns,
        data: lessons || [],
        rowCount: lessons.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        manualSorting: false,
        muiTableBodyRowProps: () => ({
          onClick: () => navigate(protectedRoute.dashboard.path),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default LessonTemplateTable
