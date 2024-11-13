import { MRT_ColumnDef } from 'material-react-table'
import { CourseComboListItemResponseDto } from '~/data/course-combo/courseCombo'

export const CourseComboColumns: MRT_ColumnDef<CourseComboListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Combo khóa học'
  },
  {
    accessorKey: 'discount',
    header: 'Giảm giá',
    size: 150,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      return `${cell.getValue()}%`
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'childCourseIds.length',
    header: 'Số khóa trong combo',
    size: 200,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    enableSorting: false
  }
]
