import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import CourseStatusTag from '~/components/tag/CourseStatusTag'
import { CourseListItemResponseDto } from '~/data/course.dto'
import { CourseLevel, CourseStatus } from '~/global/constants'
import { formatCurrency } from '~/utils/format'

export const CoursesColumns: MRT_ColumnDef<CourseListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Tên khóa học/combo',
    size: 220
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    size: 170,
    Cell: ({ cell }) => {
      if (!cell.getValue()) return ''
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    }
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    size: 80,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    }
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    size: 100,
    Cell: ({ cell }) => {
      const level = cell.getValue() as CourseLevel
      switch (level) {
        case CourseLevel.BASIC:
          return (
            <Typography color='#20c017' variant='subtitle2'>
              Cơ bản
            </Typography>
          )
        case CourseLevel.INTERMEDIATE:
          return (
            <Typography color='#FFCF22' variant='subtitle2'>
              Trung bình
            </Typography>
          )
        case CourseLevel.ADVANCED:
          return (
            <Typography color='#F66868' variant='subtitle2'>
              Nâng cao
            </Typography>
          )
        default:
          return ''
      }
    }
  },
  {
    accessorKey: 'type',
    header: 'Thể loại',
    size: 100
  },
  {
    accessorKey: 'duration',
    header: 'Thời gian',
    size: 100,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      if (!cell.getValue()) return ''
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    },
    enableColumnFilter: false
  },
  {
    header: 'Số học viên',
    size: 100,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ row }) => {
      const learnerQuantity = row.original.learnerQuantity
      const learnerLimit = row.original.learnerLimit
      return `${learnerQuantity ?? 0}/${learnerLimit}`
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 100,
    Cell: ({ cell }) => {
      const type = cell.getValue() as CourseStatus
      return <CourseStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Bản nháp', value: CourseStatus.DRAFT },
      { label: 'Chờ duyệt', value: CourseStatus.PENDING },
      { label: 'Đang công khai', value: CourseStatus.PUBLISHED },
      { label: 'Đang diễn ra', value: CourseStatus.IN_PROGRESS },
      { label: 'Đã kết thúc', value: CourseStatus.COMPLETED },
      { label: 'Đã hủy', value: CourseStatus.CANCELED },
      { label: 'Đã xóa', value: CourseStatus.DELETED }
    ]
  }
]