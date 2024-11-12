import Table from '~/components/table/Table'
import { learnerColumns } from './learner-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { ClassLearnerDto } from '~/data/class/class.dto'

interface LearnerTableProps {
  classId: string
  learners: ClassLearnerDto[]
}

const LearnerTable = ({ classId, learners }: LearnerTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách học viên'
      tableOptions={{
        columns: learnerColumns,
        data: learners || [],
        rowCount: learners.length,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        manualSorting: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () =>
            navigate(
              protectedRoute.classLearnerDetail.path
                .replace(':classId', classId)
                .replace(':learnerId', row.original._id)
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
