import { Button, Typography } from '@mui/material'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { CourseListItemResponseDto } from '~/data/course.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { TitleWrapper } from './Courses.styled'
import { Add } from '@mui/icons-material'
import Table from '~/components/table/Table'
import { CoursesColumns } from './columns'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { ListResponseDto } from '~/data/common.dto'

export default function Courses() {
  // const navigate = useNavigate()
  const { getAllCourses } = useCourseApi()
  const [data, setData] = useState<ListResponseDto<CourseListItemResponseDto>>({
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

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: gardenManager, error: apiError } = await getAllCourses(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (gardenManager) {
        setData(gardenManager)
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
  }, [getAllCourses, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Khóa học
        </Typography>
        <div style={{ display: 'flex' }}>
          <Button
            color='secondary'
            onClick={() => {
              // navigate(protectedRoute..path)
            }}
            sx={{ marginRight: '24px' }}
            endIcon={<Add />}
          >
            Thêm khóa học
          </Button>
        </div>
      </TitleWrapper>
      <Table
        title='Danh sách khóa học/combo khóa học'
        tableOptions={{
          columns: CoursesColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          muiTableBodyRowProps: ({ row }) => ({
            // onClick: () => navigate(`/garden-managers/${row.original._id}`),
            sx: {
              cursor: 'pointer'
            }
          }),
          muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 20]
          },
          state: {
            pagination: pagination,
            sorting: sorting,
            columnFilters: columnFilters
          }
        }}
      />
    </>
  )
}
