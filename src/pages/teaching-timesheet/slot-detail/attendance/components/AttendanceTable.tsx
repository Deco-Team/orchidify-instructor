import Table from '~/components/table/Table'
import { attendanceColumns, attendanceHistoryColumns, takenAttendanceColumns } from './attendance-columns'
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { AttendanceListResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import EditIcon from '@mui/icons-material/Edit'
import { AttendanceStatus } from '~/global/constants'
import { Close, Done } from '@mui/icons-material'

interface AttendanceTableProps {
  attendance: AttendanceListResponseDto
  hasTakenAttendance: boolean
  takeAttendance: (attendance: { status: AttendanceStatus; note: string; learnerId: string }) => Promise<boolean>
}

const AttendanceTable = ({ attendance, hasTakenAttendance, takeAttendance }: AttendanceTableProps) => {
  const theme = useTheme()

  return (
    <Table
      title='Danh sách học viên'
      tableOptions={{
        layoutMode: 'grid',
        columns:
          new Date().toLocaleString('sv').split(' ')[0] ===
          new Date(attendance.slot.start).toLocaleString('sv').split(' ')[0]
            ? hasTakenAttendance
              ? takenAttendanceColumns
              : attendanceColumns
            : attendanceHistoryColumns,
        data: attendance.docs || [],
        rowCount: attendance.docs.length,
        enableBottomToolbar: false,
        enableSorting: false,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        enableRowNumbers: true,
        rowNumberDisplayMode: 'static',
        renderTopToolbarCustomActions: ({ table }) => {
          return (
            <Box display={'flex'} width={'100%'} justifyContent={'space-between'} my={'auto'}>
              <Typography variant='subtitle1' my={'auto'} sx={{ color: theme.palette.info.dark }}>
                Danh sách học viên
              </Typography>
              <Typography variant='subtitle1' my={'auto'} sx={{ color: theme.palette.info.dark }}>
                Sĩ số: {table.getRowCount()}{' '}
                {hasTakenAttendance &&
                  `- Có mặt: ${attendance.docs.filter((a) => a.status === 'PRESENT').length} - Vắng: ${attendance.docs.filter((a) => a.status === 'ABSENT').length}`}
              </Typography>
            </Box>
          )
        },
        enableRowActions:
          new Date().toLocaleString('sv').split(' ')[0] ===
            new Date(attendance.slot.start).toLocaleString('sv').split(' ')[0] && hasTakenAttendance,
        positionActionsColumn: 'last',
        editDisplayMode: 'row',
        enableEditing:
          new Date().toLocaleString('sv').split(' ')[0] ===
            new Date(attendance.slot.start).toLocaleString('sv').split(' ')[0] && hasTakenAttendance,
        displayColumnDefOptions: {
          'mrt-row-actions': {
            header: '',
            size: 120,
            grow: false,
            muiTableBodyCellProps: {
              align: 'center'
            }
          },
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
        },
        icons: {
          CancelIcon: () => <Close sx={{ color: '#000000dd' }} />,
          SaveIcon: () => <Done sx={{ color: '#000000dd' }} />
        },
        renderRowActions: (props) => (
          <Tooltip title='Chỉnh sửa'>
            <IconButton
              onClick={() => {
                props.row._valuesCache.status = props.row.original.status
                props.row._valuesCache.note = props.row.original.note
                props.table.setEditingRow(props.row)
              }}
            >
              <EditIcon sx={{ color: '#000000dd' }} />
            </IconButton>
          </Tooltip>
        ),
        onEditingRowSave: async (props) => {
          if (
            props.row.original.status !== props.values.status ||
            props.row.original.note !== props.values.note.trim()
          ) {
            const result = await takeAttendance({
              status: props.values.status,
              note: props.values.note,
              learnerId: props.row.original.learnerId
            })

            if (result) {
              props.table.setEditingRow(null)
            }
          }
        }
      }}
    />
  )
}
export default AttendanceTable
