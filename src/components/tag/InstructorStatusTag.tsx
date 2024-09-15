import { Chip, SxProps, Theme } from '@mui/material'
import { InstructorStatus } from '~/global/constants'

interface InstructorStatusTagProps {
  type: InstructorStatus
}

const InstructorStatusTag = ({ type }: InstructorStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case InstructorStatus.ACTIVE: {
      label = 'Hoạt động'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case InstructorStatus.INACTIVE: {
      label = 'Vô hiệu hóa'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
  }

  return <Chip label={label} sx={styles} />
}

export default InstructorStatusTag
