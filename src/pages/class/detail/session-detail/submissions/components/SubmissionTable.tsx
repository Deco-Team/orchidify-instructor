import Table from '~/components/table/Table'
import { useNavigate } from 'react-router-dom'
import { AssignmentSubmissionItemResponseDto } from '~/data/class/class.dto'
import { submissionColumns } from './submission-columns'

interface SubmissionTableProps {
  submissions: AssignmentSubmissionItemResponseDto[]
}

const SubmissionTable = ({ submissions }: SubmissionTableProps) => {
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
          onClick: () => row.original.submission && navigate(row.original.submission?._id ?? ''),
          sx: {
            cursor: row.original.submission ? 'pointer' : 'default'
          }
        })
      }}
    />
  )
}
export default SubmissionTable
