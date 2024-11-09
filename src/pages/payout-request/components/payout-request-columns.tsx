import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatustag'
import { PayoutRequestListItemResponseDto } from '~/data/payout-request/payout-request.dto'
import { RequestStatus } from '~/global/constants'
import { formatCurrency } from '~/utils/format'

export const payoutRequestColumn: MRT_ColumnDef<PayoutRequestListItemResponseDto>[] = [
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    size: 150,
    grow: false,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const amount = cell.getValue() as number
      return (
        <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
          {formatCurrency(amount)}
        </Typography>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Mô tả yêu cầu',
    size: 300,
    enableColumnFilter: false
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 170,
    grow: false,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 170,
    grow: false,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    grow: false,
    Cell: ({ cell }) => {
      const type = cell.getValue() as RequestStatus
      return <RequestStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Chờ duyệt', value: RequestStatus.PENDING },
      { label: 'Chấp nhận', value: RequestStatus.APPROVED },
      { label: 'Từ chối', value: RequestStatus.REJECTED },
      { label: 'Quá hạn', value: RequestStatus.EXPIRED },
      { label: 'Đã hủy', value: RequestStatus.CANCELED }
    ]
  },
  {
    accessorKey: 'rejectReason',
    header: 'Lý do từ chối',
    size: 170,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const reason = cell.getValue() as string
      return (
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: 400,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '130px',
            overflow: 'hidden'
          }}
        >
          {reason}
        </Typography>
      )
    }
  }
]
