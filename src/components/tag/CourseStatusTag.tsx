import { Chip, SxProps, Theme } from '@mui/material'
import { CourseStatus } from '~/global/constants'

interface CourseStatusTagProps {
  type: CourseStatus
}

const CourseStatusTag = ({ type }: CourseStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case CourseStatus.DRAFT: {
      label = 'Bản nháp'
      styles = {
        backgroundColor: '#0000000a',
        '& .MuiChip-label': { color: '#0000007a' }
      }
      break
    }
    // case CourseStatus.REQUESTING: {
    //   label = 'Chờ duyệt'
    //   styles = {
    //     backgroundColor: '#d4f7ff',
    //     '& .MuiChip-label': { color: '#5badd0' }
    //   }
    //   break
    // }
    case CourseStatus.ACTIVE: {
      label = 'Đã công khai'
      styles = {
        display: 'none'
      }
      break
    }
  }

  return <Chip label={label} variant='filled' sx={styles} />
}

export default CourseStatusTag
