import { MRT_ColumnDef } from 'material-react-table'
import ClassStatusTag from '~/components/tag/ClassStatusTag'
import { ClassListItemResponseDto } from '~/data/class/class.dto'

export const classColumns: MRT_ColumnDef<ClassListItemResponseDto>[] = [
  {
    accessorKey: 'code',
    header: 'Mã lớp học',
    size: 150
  },
  {
    accessorKey: 'course.code',
    header: 'Mã khóa học',
    size: 150
  },
  {
    accessorKey: 'title',
    header: 'Tên khóa học',
    size: 300
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    enableColumnFilter: false,
    size: 150,
    Cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return date.toLocaleDateString('vi-VN')
    }
  },
  {
    accessorKey: 'duration',
    size: 150,
    header: 'Thời gian',
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.duration} tuần`
    }
  },
  {
    accessorKey: 'learnerQuantity',
    header: 'Số học viên',
    size: 200,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.learnerQuantity} / ${row.original.learnerLimit}`
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    enableColumnFilter: false,
    enableSorting: false,
    Cell: ({ row }) => {
      const type = row.original.status
      return <ClassStatusTag type={type} />
    }
  }
]
