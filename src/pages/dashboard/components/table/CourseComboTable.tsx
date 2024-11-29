import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import { useNavigate } from 'react-router-dom'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { CourseComboListItemResponseDto } from '~/data/course-combo/courseCombo'

const CourseComboTable = () => {
  const { getCourseComboList } = useCourseComboApi()
  const [data, setData] = useState<ListResponseDto<CourseComboListItemResponseDto>>({
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
      const { data: courses, error: apiError } = await getCourseComboList(1, 5, [], [])
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
  }, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters, getCourseComboList])

  if (error) {
    notifyError(error.message)
  }
  return (
    <Table
      title='Danh sách combo khóa học'
      tableOptions={{
        columns: courseComboColumns,
        data: data.docs || [],
        rowCount: data.totalDocs,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableColumnActions: false,
        enableSorting: false,
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
          onClick: () => navigate(protectedRoute.courseComboDetail.path.replace(':id', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}

export default CourseComboTable

const courseComboColumns: MRT_ColumnDef<CourseComboListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Combo khóa học',
    size: 200,
    grow: true
  },
  {
    accessorKey: 'discount',
    header: 'Giảm giá',
    size: 90,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      return `${cell.getValue()}%`
    }
  },
  {
    accessorKey: 'childCourseIds.length',
    header: 'Số khóa trong combo',
    size: 170,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false
  }
]
