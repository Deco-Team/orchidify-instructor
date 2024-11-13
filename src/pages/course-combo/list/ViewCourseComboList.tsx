import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import PageHeader from '~/components/header/PageHeader'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { CourseComboColumns } from './columns'
import { Link, useNavigate } from 'react-router-dom'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { CourseComboListItemResponseDto } from '~/data/course-combo/courseCombo'
import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

export default function ViewCourseComboList() {
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
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const navigate = useNavigate()
  const { getCourseComboList } = useCourseComboApi()
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])

  useEffect(() => {
    ;(async () => {
      const { data: courseComboList, error: apiError } = await getCourseComboList(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (courseComboList) {
        setData(courseComboList)
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
  }, [getCourseComboList, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <PageHeader title='Combo khóa học' />
        <Button color='secondary' component={Link} to={protectedRoute.createCourse.path} endIcon={<Add />}>
          Tạo Combo
        </Button>
      </Box>
      <Table
        title='Danh sách Combo khóa học'
        tableOptions={{
          columns: CourseComboColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          layoutMode: 'grid',
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          muiTableBodyRowProps: ({ row }) => ({
            onClick: () => navigate(protectedRoute.courseComboDetail.path.replace(':id', row.original._id)),
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
