import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import Table from '~/components/table/Table'
import { ClassRequestListItemResponseDto } from '~/data/class-request/class-request.dto'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import { useNavigate } from 'react-router-dom'
import { RequestStatus, RequestType } from '~/global/constants'
import { Box, Typography } from '@mui/material'
import { formatRequestType } from '~/utils/format'

const ClassRequesTable = () => {
  const { getClassRequestList } = useRequestApi()
  const [data, setData] = useState<ListResponseDto<ClassRequestListItemResponseDto>>({
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  })
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data: courses, error: apiError } = await getClassRequestList(
        1,
        5,
        [
          {
            field: 'createdAt',
            desc: true
          }
        ],
        [
          {
            field: 'status',
            value: RequestStatus.PENDING
          }
        ]
      )
      if (courses) {
        setData(courses)
      } else {
        setData({
          docs: [],
          totalDocs: 0,
          offset: 0,
          limit: 0,
          totalPages: 0,
          page: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null
        })
      }
      setError(apiError)
    })()
  }, [getClassRequestList, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }
  return (
    <Table
      title='Danh sách các yêu cầu'
      tableOptions={{
        columns: classRequestColumn,
        data: data.docs || [],
        rowCount: data.totalDocs,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableColumnActions: false,
        initialState: {
          sorting: [
            {
              id: 'createdAt',
              desc: true
            }
          ]
        },
        muiTablePaperProps: {
          sx: {
            boxShadow: 'none'
          }
        },
        muiTableHeadRowProps: {
          sx: {
            backgroundColor: '#f6f6f6'
          }
        },
        muiTableBodyCellProps: {
          sx: {
            py: 0.5,
            height: '53px'
          }
        },
        muiTableBodyProps: {
          sx: {
            minHeight: '265px'
          }
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.classRequestDetail.path.replace(':id', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}

export default ClassRequesTable

const classRequestColumn: MRT_ColumnDef<ClassRequestListItemResponseDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại yêu cầu',
    size: 130,
    grow: false,
    Cell: ({ row }) => {
      const type = row.original.type
      return formatRequestType(type)
    },
    enableSorting: false
  },
  {
    accessorKey: 'metadata.code',
    header: 'Mã lớp học',
    size: 135,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? 'Không có dữ liệu' : original.metadata.code
    },
    enableColumnFilter: false,
    enableSorting: false
  },
  {
    accessorFn: (row) => row.metadata.course,
    header: 'Mã khóa học',
    size: 120,
    grow: false,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? original.metadata.code : original.metadata.course!.code
    },
    enableColumnFilter: false,
    enableSorting: false
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 145,
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
  }
]
