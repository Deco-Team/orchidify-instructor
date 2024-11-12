import Table from '~/components/table/Table'
import { AttendanceListResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { takingAttendanceColumns } from './taking-attendance-columns'
import { Control } from 'react-hook-form'
import { TakeAttendanceDto } from '~/hooks/api/useAttendanceApi'

interface TakingAttendanceTableProps {
  attendance: AttendanceListResponseDto
  control: Control<TakeAttendanceDto[]>
}

const TakingAttendanceTable = ({ attendance, control }: TakingAttendanceTableProps) => {
  return (
    <Table
      title='Danh sách học viên'
      tableOptions={{
        layoutMode: 'grid',
        columns: takingAttendanceColumns({ control }),
        data: attendance.docs || [],
        rowCount: attendance.docs.length,
        enableBottomToolbar: false,
        enableSorting: false,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        enableRowNumbers: true,
        rowNumberDisplayMode: 'static',
        displayColumnDefOptions: {
          'mrt-row-numbers': {
            size: 40,
            grow: false,
            muiTableHeadCellProps: {
              align: 'center'
            },
            muiTableBodyCellProps: {
              align: 'center'
            }
          }
        }
      }}
    />
  )
}
export default TakingAttendanceTable
