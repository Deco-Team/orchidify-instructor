import { Avatar, Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import AttendanceStatusTag from '~/components/tag/AttendanceStatusTag'
import { AttendanceListItemResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { AttendanceStatus } from '~/global/constants'

export const attendanceColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 120,
    grow: false,
    Cell: ({ row }) => (
      <Avatar
        alt={row.original.learner.name}
        src={row.original.learner.avatar}
        sx={{ width: 90, height: 90, borderRadius: 1 }}
        variant='square'
      />
    ),
    enableEditing: false,
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
    enableEditing: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 220,
    grow: false,
    Cell: ({ row }) => (
      <RadioGroup row aria-labelledby='controlled-radio-buttons-group' name='controlled-radio-buttons-group'>
        <FormControlLabel
          checked={row.getValue('status') === AttendanceStatus.PRESENT}
          control={<Radio />}
          label='Có mặt'
          disabled
        />
        <FormControlLabel
          checked={
            row.getValue('status') === AttendanceStatus.ABSENT || row.getValue('status') === AttendanceStatus.NOT_YET
          }
          control={<Radio />}
          label='Vắng'
          disabled
        />
      </RadioGroup>
    ),
    enableEditing: false
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
    size: 300,
    grow: false,
    enableEditing: false
  }
]

export const takenAttendanceColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 120,
    grow: false,
    Cell: ({ row }) => (
      <Avatar
        alt={row.original.learner.name}
        src={row.original.learner.avatar}
        sx={{ width: 90, height: 90, borderRadius: 1 }}
        variant='square'
      />
    ),
    enableEditing: false,
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
    enableEditing: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 220,
    grow: false,
    Cell: ({ row }) => (
      <RadioGroup row aria-labelledby='controlled-radio-buttons-group' name='controlled-radio-buttons-group'>
        <FormControlLabel
          checked={row.getValue('status') === AttendanceStatus.PRESENT}
          control={<Radio />}
          label='Có mặt'
          disabled
        />
        <FormControlLabel
          checked={
            row.getValue('status') ===
            AttendanceStatus.ABSENT /* || row.getValue('status') === AttendanceStatus.NOT_YET */
          }
          control={<Radio />}
          label='Vắng'
          disabled
        />
      </RadioGroup>
    ),
    Edit(props) {
      return (
        <RadioGroup
          defaultValue={props.row._valuesCache.status}
          onChange={(e) => (props.row._valuesCache[props.column.id] = e.target.value as AttendanceStatus)}
          row
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
        >
          <FormControlLabel control={<Radio />} value={AttendanceStatus.PRESENT} label='Có mặt' />
          <FormControlLabel control={<Radio />} value={AttendanceStatus.ABSENT} label='Vắng' />
        </RadioGroup>
      )
    }
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
    size: 300,
    grow: false,
    muiEditTextFieldProps: {
      variant: 'outlined'
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 125,
    grow: false,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>
      )
    },
    enableEditing: false
  }
]

export const attendanceHistoryColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 120,
    grow: false,
    Cell: ({ row }) => (
      <Avatar
        alt={row.original.learner.name}
        src={row.original.learner.avatar}
        sx={{ width: 90, height: 90, borderRadius: 1 }}
        variant='square'
      />
    ),
    enableEditing: false,
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
    size: 200,
    enableEditing: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 160,
    grow: false,
    Cell: ({ cell }) => {
      const type = cell.getValue() as AttendanceStatus
      return <AttendanceStatusTag type={type} />
    },
    enableEditing: false
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
    size: 300,
    grow: false,
    enableEditing: false
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 125,
    grow: false,
    Cell: ({ row }) => {
      const status = row.getValue('status') as string
      const date = row.getValue('updatedAt') as string

      return (
        status !== AttendanceStatus.NOT_YET && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleTimeString('vi-VN')}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleDateString('vi-VN')}
            </Typography>
          </Box>
        )
      )
    },
    enableEditing: false
  }
]
