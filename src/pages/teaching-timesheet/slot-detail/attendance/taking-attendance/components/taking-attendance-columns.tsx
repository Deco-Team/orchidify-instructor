import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { Control, Controller } from 'react-hook-form'
import { AttendanceListItemResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { AttendanceStatus } from '~/global/constants'
import { TakeAttendanceDto } from '~/hooks/api/useAttendanceApi'

interface TakingAttendanceColumnsProps {
  control: Control<TakeAttendanceDto[]>
}

export const takingAttendanceColumns = ({
  control
}: TakingAttendanceColumnsProps): MRT_ColumnDef<AttendanceListItemResponseDto>[] => [
  {
    accessorKey: 'learner',
    header: 'Ảnh đại diện',
    size: 100,
    Cell: ({ row }) => (
      <>
        <Controller
          name={`${row.index}.learnerId`}
          control={control}
          defaultValue={row.original.learnerId}
          render={({ field }) => <TextField {...field} sx={{ display: 'none' }} />}
        />
        <img
          src={row.original.learner.avatar}
          alt='avatar'
          style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4 }}
        />
      </>
    ),
    muiTableHeadCellProps: {
      align: 'center'
    },
    muiTableBodyCellProps: {
      align: 'center'
    }
  },
  {
    accessorKey: 'learner.name',
    header: 'Họ tên',
    size: 200
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 250,
    Cell: ({ row }) => (
      <FormControl>
        <Controller
          name={`${row.index}.status`}
          control={control}
          defaultValue={
            row.original.status === AttendanceStatus.NOT_YET ? AttendanceStatus.ABSENT : row.original.status
          }
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value={AttendanceStatus.PRESENT} control={<Radio />} label='Có mặt' />
              <FormControlLabel value={AttendanceStatus.ABSENT} control={<Radio />} label='Vắng' />
            </RadioGroup>
          )}
        />
      </FormControl>
    )
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
    size: 300,
    Cell: ({ row }) => (
      <Controller
        name={`${row.index}.note`}
        control={control}
        defaultValue={row.original.note}
        render={({ field }) => <TextField {...field} fullWidth size='small' />}
      />
    )
  }
]