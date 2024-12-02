import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import { useNavigate } from 'react-router-dom'
import { PayoutRequestListItemResponseDto } from '~/data/payout-request/payout-request.dto'
import { payoutRequestColumn } from './payout-request-columns'

const PayoutRequestTable = () => {
  const { getPayoutRequestList } = useRequestApi()
  const [data, setData] = useState<ListResponseDto<PayoutRequestListItemResponseDto>>({
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
  const [sorting, setSorting] = useState<MRT_SortingState>([{ id: 'updatedAt', desc: true }])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data: courses, error: apiError } = await getPayoutRequestList(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        [
          ...columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
          // { field: 'status', value: statusFilter }
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
  }, [getPayoutRequestList, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }
  return (
    <Table
      title='Danh sách các yêu cầu'
      tableOptions={{
        columns: payoutRequestColumn,
        data: data.docs || [],
        rowCount: data.totalDocs,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.payoutRequestDetail.path.replace(':id', row.original._id)),
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

export default PayoutRequestTable
