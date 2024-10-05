import Table from '~/components/table/Table'
import { lessonColumns } from './lesson-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { LessonDto } from '~/data/course/course.dto'

interface LessonTableProps {
  lessons: LessonDto[]
  courseId: string
}

const LessonTable = ({ lessons, courseId }: LessonTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách bài học'
      tableOptions={{
        columns: lessonColumns,
        data: lessons || [],
        rowCount: lessons.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        manualSorting: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () =>
            navigate(
              protectedRoute.courseLessonDetail.path
                .replace(':courseId', courseId)
                .replace(':lessonId', row.original._id)
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default LessonTable
