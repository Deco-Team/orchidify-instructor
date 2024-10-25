import { MRT_ColumnDef } from 'material-react-table'
import { SessionDto } from '~/data/course/course.dto'

export const sessionColumns: MRT_ColumnDef<SessionDto>[] = [
  {
    accessorKey: 'sessionNumber',
    header: 'STT',
    size: 50,
    muiTableHeadCellProps: {
      align: 'center'
    },
    muiTableBodyCellProps: {
      align: 'center'
    }
  },
  {
    accessorKey: 'title',
    header: 'Tên bài học'
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    size: 500
  },
  {
    /*
      Only allow 1 assignment per session 
     */
    header: 'Bài tập',
    size: 200,
    Cell: ({ row }) => (row.original.assignments.length > 0 ? row.original.assignments[0].title : '')
  }
]
