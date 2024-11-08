import { Avatar, Rating } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { FeedbackDto } from '~/data/feedback/feedback.dto'

export const feedbackColumns: MRT_ColumnDef<FeedbackDto>[] = [
  {
    accessorKey: '_id',
    header: 'Tên học viên',
    grow: false,
    size: 120,
    muiTableHeadCellProps: {
      align: 'center'
    },
    muiTableBodyCellProps: {
      align: 'center'
    },
    enableColumnFilter: false,
    enableSorting: false,
    Cell: () => {
      return <Avatar />
    }
  },
  {
    accessorKey: 'rate',
    header: 'Sao đánh giá',
    grow: false,
    size: 180,
    Cell: ({ cell }) => {
      const rate = cell.getValue() as number
      return <Rating value={rate} readOnly precision={0.5} />
    },
    muiTableHeadCellProps: {
      align: 'center'
    },
    muiTableBodyCellProps: {
      align: 'center'
    },
    filterVariant: 'select',
    filterSelectOptions: ['5', '4', '3', '2', '1']
  },
  {
    accessorKey: 'comment',
    header: 'Nhận xét',
    grow: true,
    enableColumnFilter: false,
    enableSorting: false
  }
]
