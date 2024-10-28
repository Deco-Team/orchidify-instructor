import Table from '~/components/table/Table'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { SubmissionDto } from '~/data/class/class.dto'
import { submissionColumns } from './submission-columns'

interface SubmissionTableProps {
  submissions: SubmissionDto[]
  classId: string
  sessionId: string
}

const SubmissionTable = ({ submissions, classId, sessionId }: SubmissionTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách bài làm'
      tableOptions={{
        columns: submissionColumns,
        data: submissions || [],
        rowCount: submissions.length,
        enableBottomToolbar: true,
        enableSorting: true,
        enableColumnFilters: true,
        enableHiding: true,
        enableColumnActions: false,
        manualSorting: false,
        manualFiltering: false,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () =>
            navigate(
              protectedRoute.classSubmissionDetail.path
                .replace(':classId', classId)
                .replace(':sessionId', sessionId)
                .replace(':submissionId', row.original._id)
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default SubmissionTable
