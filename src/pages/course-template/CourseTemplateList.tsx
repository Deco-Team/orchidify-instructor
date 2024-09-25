import { Button, Typography } from '@mui/material'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { TitleWrapper } from './CourseTemplateList.styled'
import { Add } from '@mui/icons-material'
import Table from '~/components/table/Table'
import { courseTemplateColumns } from './course-template-columns'
import { ListResponseDto } from '~/data/common.dto'
import { Link, useNavigate } from 'react-router-dom'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'
import { CourseTemplateListItemResponseDto } from '~/data/course-template/course-template.dto'
import { protectedRoute } from '~/routes/routes'

export default function CourseTemplateList() {
  const { getCourseTemplateList } = useCourseTemplateApi()
  const [data, setData] = useState<ListResponseDto<CourseTemplateListItemResponseDto>>({
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
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: courseTemplates, error: apiError } = await getCourseTemplateList(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (courseTemplates) {
        setData(courseTemplates)
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
  }, [getCourseTemplateList, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h4' fontWeight='bold'>
          Mẫu khóa học
        </Typography>
        <Button
          color='secondary'
          component={Link}
          to={protectedRoute.createCourseTemplate.path}
          sx={{ marginRight: '24px' }}
          endIcon={<Add />}
        >
          Thêm mẫu khóa học
        </Button>
      </TitleWrapper>
      <Table
        title='Danh sách mẫu khóa học'
        tableOptions={{
          columns: courseTemplateColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          enableColumnResizing: true,
          muiTableBodyRowProps: () => ({
            onClick: () => navigate(protectedRoute.dashboard.path),
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
