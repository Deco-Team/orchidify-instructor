import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import CourseStatusTag from '~/components/tag/CourseStatusTag'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { CourseLevel, CourseStatus } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

export const courseColumns: MRT_ColumnDef<CourseListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Khóa học',
    size: 300
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    maxSize: 120,
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
    size: 120,
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
                  ? '#f66868'
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
    size: 180
    // Cell: ({ cell }) => {
    //   return (cell.getValue() as []).join(', ')
    // }
  },
  {
    accessorKey: 'learnerLimit',
    header: 'Giới hạn học viên',
    size: 200,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const type = cell.getValue() as CourseStatus
      return <CourseStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Bản nháp', value: CourseStatus.DRAFT },
      { label: 'Chờ duyệt', value: CourseStatus.REQUESTING },
      { label: 'Đang hoạt động', value: CourseStatus.ACTIVE }
    ]
  }
]
