import { Box, Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface HeaderProps {
  showCancelClassRequestButton: boolean
  onCancelClassRequestButtonClick: () => void
}

const Header = ({ showCancelClassRequestButton, onCancelClassRequestButtonClick }: HeaderProps) => {
  const breadcrumbsItems = [protectedRoute.classList, protectedRoute.classDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết lớp học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {showCancelClassRequestButton ? (
          <Button color='error' onClick={onCancelClassRequestButtonClick}>
            Yêu cầu Hủy
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default Header
