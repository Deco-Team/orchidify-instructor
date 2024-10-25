import Table from '~/components/table/Table'
import { learnerColumns } from './learner-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { ClassLearnerDto } from '~/data/class/class.dto'

interface LearnerTableProps {
  learners: ClassLearnerDto[]
}

const LearnerTable = ({ learners }: LearnerTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách học viên'
      tableOptions={{
        columns: learnerColumns,
        data: learners || [],
        rowCount: learners.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        muiTableBodyRowProps: () => ({
          onClick: () =>
            navigate(
              /* protectedRoute.learnerDetail.path.replace(':id', row.original._id) */ protectedRoute.dashboard.path
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default LearnerTable
