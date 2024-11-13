import Table from '~/components/table/Table'
import { childCourseColumns } from './child-course-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { ChildCourseDetailDto } from '~/data/course-combo/courseCombo'

interface ChildCourseTableProps {
  childCourses: ChildCourseDetailDto[]
}

const ChildCourseTable = ({ childCourses }: ChildCourseTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách khóa học trong combo'
      tableOptions={{
        columns: childCourseColumns,
        data: childCourses || [],
        rowCount: childCourses.length,
        layoutMode: 'grid',
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        enableFilters: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.courseDetail.path.replace(':id', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default ChildCourseTable
