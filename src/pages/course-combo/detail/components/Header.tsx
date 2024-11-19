import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

interface HeaderProps {
  onDeleteButtonClick: () => void
}

const Header = ({ onDeleteButtonClick }: HeaderProps) => {
  const breadcrumbsItems = [protectedRoute.courseComboList, protectedRoute.courseComboDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết Combo khóa học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' gap='1.5rem'>
        <Button color='warning' component={Link} to={'update'}>
          Cập nhật
        </Button>
        <Button color='error' onClick={onDeleteButtonClick}>
          Xóa
        </Button>
      </Box>
    </Box>
  )
}

export default Header
