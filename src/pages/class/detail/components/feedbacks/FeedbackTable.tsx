import { MRT_ColumnFiltersState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import Table from '~/components/table/Table'
import useFeedbackApi from '~/hooks/api/useFeedbackApi'
import { FeedbackDto } from '~/data/feedback/feedback.dto'
import { feedbackColumns } from './feedback-columns'

interface FeedbackTableProps {
  classId: string
}

const FeedbackTable = ({ classId }: FeedbackTableProps) => {
  const { getClassFeedbackList } = useFeedbackApi()

  const [data, setData] = useState<FeedbackDto[]>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])

  useEffect(() => {
    ;(async () => {
      const { data: feedbacks, error: apiError } = await getClassFeedbackList(
        classId,
        columnFilters.find((filter) => filter.id === 'rate')?.value as number
      )
      if (feedbacks) {
        setData(feedbacks)
      } else if (apiError) {
        notifyError(apiError.message)
      }
    })()
  }, [classId, getClassFeedbackList, columnFilters])

  return (
    <Table
      title='Đánh giá'
      tableOptions={{
        columns: feedbackColumns,
        data: data || [],
        rowCount: data.length,
        enableBottomToolbar: true,
        enableSorting: true,
        enableColumnFilters: true,
        enableHiding: false,
        enableColumnActions: false,
        manualSorting: false,
        onColumnFiltersChange: setColumnFilters,
        state: {
          columnFilters: columnFilters
        }
      }}
    />
  )
}

export default FeedbackTable
