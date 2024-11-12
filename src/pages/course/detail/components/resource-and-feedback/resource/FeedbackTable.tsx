import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import useFeedbackApi from '~/hooks/api/useFeedbackApi'
import { FeedbackDto } from '~/data/feedback/feedback.dto'
import { feedbackColumns } from './feedback-columns'

interface FeedbackTableProps {
  courseId: string
}

const FeedbackTable = ({ courseId }: FeedbackTableProps) => {
  const { getCourseFeedbackList } = useFeedbackApi()

  const [data, setData] = useState<ListResponseDto<FeedbackDto>>({
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

  useEffect(() => {
    ;(async () => {
      const { data: feedbacks, error: apiError } = await getCourseFeedbackList(
        courseId,
        columnFilters.find((filter) => filter.id === 'rate')?.value as number,
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc }))
      )
      if (feedbacks) {
        setData(feedbacks)
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
  }, [courseId, getCourseFeedbackList, pagination, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Table
      title='Đánh giá'
      tableOptions={{
        columns: feedbackColumns,
        data: data.docs || [],
        rowCount: data.totalDocs,
        enableHiding: false,
        enableColumnActions: false,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
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

export default FeedbackTable
