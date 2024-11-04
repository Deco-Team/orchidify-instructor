import { Chip, SxProps, Theme } from '@mui/material'
import { AttendanceStatus } from '~/global/constants'

interface AttendanceStatusTagProps {
  type: AttendanceStatus
}

const AttendanceStatusTag = ({ type }: AttendanceStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case AttendanceStatus.PRESENT: {
      label = 'Có mặt'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case AttendanceStatus.ABSENT: {
      label = 'Vắng'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case AttendanceStatus.NOT_YET: {
      label = 'Chưa điểm danh'
      styles = {
        backgroundColor: '#0000000a',
        '& .MuiChip-label': { color: '#0000007a' }
      }
      break
    }
  }

  return <Chip label={label} sx={styles} />
}

export default AttendanceStatusTag
