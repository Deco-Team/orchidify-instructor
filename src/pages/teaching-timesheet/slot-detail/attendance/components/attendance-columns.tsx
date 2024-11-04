import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import AttendanceStatusTag from '~/components/tag/AttendanceStatusTag'
import { AttendanceListItemResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { AttendanceStatus } from '~/global/constants'

export const attendanceColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 100,
    Cell: ({ row }) => (
      <img
        src={row.original.learner.avatar}
        alt='avatar'
        style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4 }}
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
    size: 250,
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
    size: 200,
    enableEditing: false
  }
]

export const takenAttendanceColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 100,
    Cell: ({ row }) => (
      <img
        src={row.original.learner.avatar}
        alt='avatar'
        style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4 }}
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
    minSize: 220,
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
    muiEditTextFieldProps: {
      variant: 'outlined'
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 125,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    },
    enableEditing: false
  }
]

export const attendanceHistoryColumns: MRT_ColumnDef<AttendanceListItemResponseDto>[] = [
  {
    accessorKey: 'learner.avatar',
    header: 'Ảnh đại diện',
    size: 100,
    Cell: ({ row }) => (
      <img
        src={row.original.learner.avatar}
        alt='avatar'
        style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4 }}
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
    size: 100,
    Cell: ({ cell }) => {
      const type = cell.getValue() as AttendanceStatus
      return <AttendanceStatusTag type={type} />
    },
    enableEditing: false
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
    size: 200,
    enableEditing: false
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 125,
    Cell: ({ row }) => {
      const status = row.getValue('status') as string
      const date = row.getValue('updatedAt') as string

      return (
        status !== AttendanceStatus.NOT_YET && (
          <>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleTimeString('vi-VN')}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleDateString('vi-VN')}
            </Typography>
          </>
        )
      )
    },
    enableEditing: false
  }
]
