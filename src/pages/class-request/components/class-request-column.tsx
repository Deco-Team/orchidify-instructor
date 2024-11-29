import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatustag'
import { ClassRequestListItemResponseDto } from '~/data/class-request/class-request.dto'
import { RequestStatus, RequestType } from '~/global/constants'
import { formatRequestType } from '~/utils/format'

export const classRequestColumn: MRT_ColumnDef<ClassRequestListItemResponseDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại yêu cầu',
    size: 165,
    grow: false,
    Cell: ({ row }) => {
      const type = row.original.type
      return formatRequestType(type)
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Mở lớp học', value: RequestType.PUBLISH_CLASS },
      { label: 'Hủy lớp học', value: RequestType.CANCEL_CLASS }
    ]
  },
  {
    accessorKey: 'metadata.code',
    header: 'Mã lớp học',
    size: 140,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? 'Không có dữ liệu' : original.metadata.code
    },
    enableColumnFilter: false
  },
  {
    accessorFn: (row) => row.metadata.course,
    header: 'Mã khóa học',
    size: 170,
    grow: false,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? original.metadata.code : original.metadata.course!.code
    },
    enableColumnFilter: false
  },
  {
    accessorFn: (row) => row.metadata.title,
    header: 'Tên khóa học',
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
    size: 130,
    grow: false,
    enableSorting: false,
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
