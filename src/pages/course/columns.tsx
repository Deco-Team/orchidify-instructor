import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import CourseStatusTag from '~/components/tag/CourseStatusTag'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { CourseLevel, CourseStatus } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

export const CoursesColumns: MRT_ColumnDef<CourseListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Tên khóa học/combo',
    grow: 1
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    size: 170,
    Cell: ({ cell }) => {
      if (!cell.getValue()) return 'Chưa xác định'
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    size: 120,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    size: 130,
    Cell: ({ cell }) => {
      const level = cell.getValue() as CourseLevel

      return (
        <Typography
          variant='subtitle2'
          color={
            level === CourseLevel.BASIC
              ? '#20c017'
              : level === CourseLevel.INTERMEDIATE
                ? '#ffcf22'
                : level === CourseLevel.ADVANCED
                  ? 'f66868'
                  : undefined
          }
        >
          {formatCourseLevel(level)}
        </Typography>
      )
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Cơ bản', value: CourseLevel.BASIC },
      { label: 'Trung bình', value: CourseLevel.INTERMEDIATE },
      { label: 'Nâng cao', value: CourseLevel.ADVANCED }
    ]
  },
  {
    accessorKey: 'type',
    header: 'Thể loại',
    size: 140
  },
  {
    accessorKey: 'duration',
    header: 'Thời gian',
    size: 150,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      if (!cell.getValue()) return 'Chưa xác định'
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'learnerQuantity',
    header: 'Số học viên',
    size: 160,
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
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    Cell: ({ cell }) => {
      const type = cell.getValue() as CourseStatus
      return <CourseStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Đang công khai', value: CourseStatus.PUBLISHED },
      { label: 'Đang diễn ra', value: CourseStatus.IN_PROGRESS },
      { label: 'Đã kết thúc', value: CourseStatus.COMPLETED },
      { label: 'Đã hủy', value: CourseStatus.CANCELED },
      { label: 'Đã xóa', value: CourseStatus.DELETED }
    ]
  }
]
