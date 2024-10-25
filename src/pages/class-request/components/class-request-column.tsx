import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatustag'
import { ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { RequestStatus, RequestType } from '~/global/constants'
import { formatRequestType } from '~/utils/format'

export const classRequestColumn: MRT_ColumnDef<ClassRequestListItemResponseDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại yêu cầu',
    size: 170,
    Cell: ({ cell }) => {
      const type = cell.getValue() as RequestType

      return <Typography variant='subtitle2'>{formatRequestType(type)}</Typography>
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [{ label: 'Mở lớp học', value: RequestType.PUBLISH_CLASS }]
  },
  //   {
  //     accessorKey: 'classId',
  //     header: 'Mã lớp học',
  //     size: 170,
  //     enableColumnFilter: false
  //   },
  {
    accessorKey: 'metadata.code',
    header: 'Mã khóa học',
    size: 170,
    enableColumnFilter: false
  },
  {
    accessorKey: 'metadata.title',
    header: 'Tên khóa học',
    size: 300,
    enableColumnFilter: false
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 170,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 170,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 170,
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
