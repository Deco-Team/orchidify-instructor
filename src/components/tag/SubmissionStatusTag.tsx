import { Chip, SxProps, Theme } from '@mui/material'
import { SubmissionStatus } from '~/global/constants'

interface SubmissionStatusTagProps {
  type?: SubmissionStatus
}

const SubmissionStatusTag = ({ type }: SubmissionStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case SubmissionStatus.SUBMITTED: {
      label = 'Đã nộp bài'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case SubmissionStatus.GRADED: {
      label = 'Đã chấm'
      styles = {
        backgroundColor: '#d4f7ff',
        '& .MuiChip-label': { color: '#5badd0' }
      }
      break
    }
    default: {
      label = 'Chưa nộp'
      styles = {
        backgroundColor: '#0000000a',
        '& .MuiChip-label': { color: '#0000007a' }
      }
      break
    }
  }

  return <Chip label={label} sx={styles} />
}

export default SubmissionStatusTag
