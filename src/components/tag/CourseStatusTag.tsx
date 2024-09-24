import { Chip, SxProps, Theme } from '@mui/material'
import { CourseStatus } from '~/global/constants'

interface CourseStatusTagProps {
  type: CourseStatus
}

const CourseStatusTag = ({ type }: CourseStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case CourseStatus.PUBLISHED: {
      label = 'Đã công khai'
      styles = {
        backgroundColor: '#ffcf221f',
        '& .MuiChip-label': { color: '#ffcf22' }
      }
      break
    }
    case CourseStatus.IN_PROGRESS: {
      label = 'Đang diễn ra'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case CourseStatus.COMPLETED: {
      label = 'Đã kết thúc'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case CourseStatus.CANCELED: {
      label = 'Đã hủy'
      styles = {
        backgroundColor: 'transparent',
        '& .MuiChip-label': { color: '#0000007a', textDecoration: 'line-through' }
      }
      break
    }
    case CourseStatus.DELETED: {
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
      variant={label === CourseStatus.CANCELED || label === CourseStatus.DELETED ? 'outlined' : 'filled'}
      sx={styles}
    />
  )
}

export default CourseStatusTag
