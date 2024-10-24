import { Box, Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface HeaderProps {
  showCancelRequestButton: boolean
  onCancelRequestButtonClick: () => void
}

const Header = ({ showCancelRequestButton, onCancelRequestButtonClick }: HeaderProps) => {
  const breadcrumbsItems = [protectedRoute.classList, protectedRoute.classDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết lớp học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {showCancelRequestButton ? (
          <Button color='error' onClick={onCancelRequestButtonClick}>
            Yêu cầu Hủy
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default Header
