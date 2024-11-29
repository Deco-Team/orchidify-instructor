import Table from '~/components/table/Table'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { Typography } from '@mui/material'
import { TeachingTimesheetItemResponseDto } from '~/data/teaching-timesheet/teaching-timesheet.dto'
import { MRT_ColumnDef } from 'material-react-table'
import { useTimesheetApi } from '~/hooks/api/useTimesheetApi'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'

const TimesheetTable = () => {
  const navigate = useNavigate()

  const [teachingTimesheet, setTeachingTimesheet] = useState<TeachingTimesheetItemResponseDto[]>([])
  const { getTeachingTimesheet } = useTimesheetApi()

  useEffect(() => {
    ;(async () => {
      const { data: teachingTimesheet, error: apiError } = await getTeachingTimesheet(new Date().toISOString(), 'DAY')
      if (teachingTimesheet) {
        setTeachingTimesheet(teachingTimesheet.sort((a, b) => (a.slotNumber ?? 0) - (b.slotNumber ?? 0)))
      }
      if (apiError) {
        notifyError(apiError.message)
      }
    })()
  }, [getTeachingTimesheet])

  return (
    <Table
      title='Danh sách học viên'
      tableOptions={{
        columns: timesheetColumns,
        data: teachingTimesheet || [],
        rowCount: teachingTimesheet.length,
        renderEmptyRowsFallback: () => (
          <Typography
            variant='body1'
            sx={{ color: 'rgba(0, 0, 0, 0.6)', fontStyle: 'italic', py: '2rem', textAlign: 'center', width: '100%' }}
          >
            Không có tiết học
          </Typography>
        ),
        enableSorting: false,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        enableStickyFooter: false,
        enablePagination: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableTableHead: false,
        muiTablePaperProps: {
          sx: {
            boxShadow: 'none'
          }
        },
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.slotDetail.path.replace(':slotId', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default TimesheetTable

const timesheetColumns: MRT_ColumnDef<TeachingTimesheetItemResponseDto>[] = [
  {
    accessorKey: 'metadata.code',
    header: 'Mã lớp học',
    size: 120,
    grow: false
  },
  {
    accessorKey: 'metadata.title',
    header: 'Tên khóa học',
    size: 120,
    grow: true
  },
  {
    accessorKey: 'garden.name',
    header: 'Nhà vườn',
    size: 180,
    grow: false
  },
  {
    accessorKey: 'slotNumber',
    header: 'Tiết học',
    size: 75,
    grow: false,
    Cell: ({ cell }) => {
      const slotNumber = cell.getValue() as number
      return (
        <Typography
          variant='body2'
          fontWeight={'500'}
          color={slotNumber === 1 ? '#0084ff' : slotNumber === 2 ? '#00ba34' : slotNumber === 3 ? '#ff9f2d' : '#e92c2c'}
        >
          Tiết {slotNumber}
        </Typography>
      )
    }
  },
  {
    accessorKey: 'start',
    header: 'Giờ học',
    size: 120,
    grow: false,
    Cell: ({ row }) =>
      `${new Date(row.original.start).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })} - ${new Date(row.original.end).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`,
    muiTableBodyCellProps: {
      align: 'right'
    }
  }
]
