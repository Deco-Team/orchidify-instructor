import Table from '~/components/table/Table'
import { learnerColumns } from './learner-columns'
import { Link, useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { ClassLearnerDto } from '~/data/class/class.dto'
import { Button } from '@mui/material'

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
        enableBottomToolbar: false,
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
        }),
        enableRowActions: true,
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
          'mrt-row-actions': {
            header: '',
            size: 150,
            grow: false,
            muiTableBodyCellProps: {
              align: 'center'
            }
          }
        },
        renderRowActions: ({ row }) => {
          return (
            <Button
              component={Link}
              to={`learners/${row.original._id}/chat`}
              onClick={(event) => event.stopPropagation()}
            >
              Trao đổi
            </Button>
          )
        }
      }}
    />
  )
}
export default LearnerTable
