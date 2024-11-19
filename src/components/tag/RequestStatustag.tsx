import { Chip, SxProps, Theme } from '@mui/material'
import { RequestStatus } from '~/global/constants'

interface RequestStatusTagProps {
  type: RequestStatus
}

const RequestStatusTag = ({ type }: RequestStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case RequestStatus.PENDING: {
      label = 'Chờ duyệt'
      styles = {
        backgroundColor: '#d4f7ff',
        '& .MuiChip-label': { color: '#5badd0' }
      }
      break
    }
    case RequestStatus.APPROVED: {
      label = 'Chấp nhận'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case RequestStatus.REJECTED: {
      label = 'Từ chối'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case RequestStatus.EXPIRED: {
      label = 'Quá hạn'
      styles = {
        backgroundColor: '#0000000a',
        '& .MuiChip-label': { color: '#0000007a' }
      }
      break
    }
    case RequestStatus.CANCELED: {
      label = 'Đã hủy'
      styles = {
        backgroundColor: 'transparent',
        '& .MuiChip-label': { color: '#0000007a', textDecoration: 'line-through' }
      }
      break
    }
  }

  return <Chip label={label} variant={type === RequestStatus.CANCELED ? 'outlined' : 'filled'} sx={styles} />
}

export default RequestStatusTag
