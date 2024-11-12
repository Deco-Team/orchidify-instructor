import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import Table from '~/components/table/Table'
import { courseColumns } from './course-columns'
import { ListResponseDto } from '~/data/common.dto'
import { useNavigate } from 'react-router-dom'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { CourseListItemResponseDto, CourseTypesResponstDto } from '~/data/course/course.dto'
import { protectedRoute } from '~/routes/routes'
import { CourseStatus } from '~/global/constants'
import { IconButton, InputAdornment, ListSubheader, MenuItem, Select, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

interface CourseTableProps {
  statusFilter: CourseStatus
}

const CourseTable = ({ statusFilter }: CourseTableProps) => {
  const { getCourseList, getCourseTypes } = useCourseApi()
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
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: courses, error: apiError } = await getCourseList(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        [
          ...columnFilters.map((filter) => ({ field: filter.id, value: filter.value })),
          { field: 'status', value: statusFilter }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCourseList, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  const renderGroupedItems = (courseTypes: CourseTypesResponstDto[]) => {
    return courseTypes.reduce((acc, group) => {
      acc.push(
        <ListSubheader key={group.groupName} sx={{ color: '#000000', fontWeight: '500' }}>
          {group.groupName}
        </ListSubheader>
      )
      group.groupItems.forEach((item) => {
        acc.push(
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        )
      })
      return acc
    }, [] as JSX.Element[])
  }

  useEffect(() => {
    ;(async () => {
      const { data: courseTypes, error: apiError } = await getCourseTypes()

      if (courseTypes) {
        courseColumns[courseColumns.findIndex((column) => column.id === 'type')].Filter = ({ column }) => (
          <Select
            defaultValue={''}
            value={column.getFilterValue() || ''}
            variant='standard'
            onChange={(e) => column.setFilterValue(e.target.value)}
            displayEmpty
            endAdornment={
              <InputAdornment sx={{ marginRight: '10px' }} position='end'>
                <IconButton
                  disabled={!column.getFilterValue()}
                  size='small'
                  onClick={() => {
                    column.setFilterValue('')
                  }}
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          >
            <MenuItem value='' disabled>
              <Typography sx={{ color: '#000000DE', opacity: 0.5, overflow: 'hidden' }}>
                Lọc kết quả theo thể loại
              </Typography>
            </MenuItem>
            {renderGroupedItems(courseTypes)}
          </Select>
        )
      }

      setError(apiError)
    })()
  }, [getCourseTypes])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Table
      title='Danh sách khóa học'
      tableOptions={{
        columns: courseColumns,
        data: data.docs || [],
        rowCount: data.totalDocs,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.courseDetail.path.replace(':id', row.original._id)),
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
  )
}

export default CourseTable
