import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { CourseLevel } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

export const courseComboColumns: MRT_ColumnDef<CourseListItemResponseDto>[] = [
  {
    accessorKey: 'code',
    header: 'Mã khóa học',
    grow: false,
    size: 150
  },
  {
    accessorKey: 'title',
    header: 'Tên khóa học'
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    grow: false,
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
    grow: false,
    size: 110,
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
    enableColumnFilter: false,
    enableSorting: false
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Thể loại',
    grow: true,
    size: 200,
    filterVariant: 'select',
    filterSelectOptions: [],
    Cell: ({ cell }) => {
      return (cell.getValue() as []).join(', ')
    },
    enableSorting: false
  },
  {
    accessorKey: 'learnerLimit',
    header: 'Giới hạn học viên',
    size: 170,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    }
  }
]
