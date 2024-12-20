import { MRT_ColumnDef } from 'material-react-table'
import ClassStatusTag from '~/components/tag/ClassStatusTag'
import { ClassListItemResponseDto } from '~/data/class/class.dto'

export const classColumns: MRT_ColumnDef<ClassListItemResponseDto>[] = [
  {
    accessorKey: 'code',
    header: 'Mã lớp học',
    size: 160,
    grow: false
  },
  {
    accessorKey: 'course.code',
    header: 'Mã khóa học',
    size: 165,
    grow: false
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
    size: 170,
    grow: false,
    Cell: ({ row }) => {
      const date = new Date(row.original.startDate)
      return date.toLocaleDateString('vi-VN')
    }
  },
  {
    accessorKey: 'duration',
    size: 150,
    grow: false,
    header: 'Thời gian',
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.duration} tuần`
    }
  },
  {
    accessorKey: 'progress',
    size: 130,
    grow: false,
    header: 'Tiến độ',
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.progress?.percentage}% (${row.original.progress?.completed}/${row.original.progress?.total})`
    }
  },
  {
    accessorKey: 'learnerQuantity',
    header: 'Số học viên',
    size: 160,
    grow: false,
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
    grow: false,
    enableColumnFilter: false,
    enableSorting: false,
    Cell: ({ row }) => {
      const type = row.original.status
      return <ClassStatusTag type={type} />
    }
  }
]
