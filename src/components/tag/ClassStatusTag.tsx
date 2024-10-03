import { Chip, SxProps, Theme } from '@mui/material'
import { ClassStatus } from '~/global/constants'

interface ClassStatusTagProps {
  type: ClassStatus
}

const ClassStatusTag = ({ type }: ClassStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case ClassStatus.PUBLISHED: {
      label = 'Đã công khai'
      styles = {
        backgroundColor: '#ffcf221f',
        '& .MuiChip-label': { color: '#ffcf22' }
      }
      break
    }
    case ClassStatus.IN_PROGRESS: {
      label = 'Đang diễn ra'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case ClassStatus.COMPLETED: {
      label = 'Đã kết thúc'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case ClassStatus.CANCELED: {
      label = 'Đã hủy'
      styles = {
        backgroundColor: 'transparent',
        '& .MuiChip-label': { color: '#0000007a', textDecoration: 'line-through' }
      }
      break
    }
    case ClassStatus.DELETED: {
      label = 'Đã xóa'
      styles = {
        backgroundColor: 'transparent',
        '& .MuiChip-label': { color: '#f66868', textDecoration: 'line-through' }
      }
      break
    }
  }

  return (
    <Chip
      label={label}
      variant={label === ClassStatus.CANCELED || label === ClassStatus.DELETED ? 'outlined' : 'filled'}
      sx={styles}
    />
  )
}

export default ClassStatusTag
