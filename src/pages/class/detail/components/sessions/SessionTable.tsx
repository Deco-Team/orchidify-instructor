import Table from '~/components/table/Table'
import { sessionColumns } from './session-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { SessionDto } from '~/data/course/course.dto'

interface SessionTableProps {
  sessions: SessionDto[]
  classId: string
}

const SessionTable = ({ sessions, classId }: SessionTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách nội dung buổi học'
      tableOptions={{
        columns: sessionColumns,
        data: sessions || [],
        rowCount: sessions.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () =>
            navigate(
              protectedRoute.classSessionDetail.path
                .replace(':classId', classId)
                .replace(':sessionId', row.original._id)
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default SessionTable
