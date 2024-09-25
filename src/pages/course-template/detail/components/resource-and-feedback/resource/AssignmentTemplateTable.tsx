import Table from '~/components/table/Table'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { AssignmentDto } from '~/data/course-template/course-template.dto'
import { assignmentTemplateColumns } from './assignment-template-columns'

interface AssignmentTemplateTableProps {
  assignments: AssignmentDto[]
  courseTemplateId: string
}

const AssignmentTemplateTable = ({ assignments, courseTemplateId }: AssignmentTemplateTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách bài tập'
      tableOptions={{
        columns: assignmentTemplateColumns,
        data: assignments || [],
        rowCount: assignments.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        manualSorting: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () =>
            navigate(
              protectedRoute.courseTemplateAssignmentDetail.path
                .replace(':courseId', courseTemplateId)
                .replace(':assignmentId', row.original._id)
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default AssignmentTemplateTable
