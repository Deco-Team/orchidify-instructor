import { DrawerHeader, Logo, LogoWrapper, StyledDrawer } from './Sidebar.styled'
import { Button, Divider, Typography } from '@mui/material'
import OptionList from './OptionList'
import { Logout } from '@mui/icons-material'

interface SidebarProps {
  open: boolean
  drawerWidth: number
}

const Sidebar = ({ open, drawerWidth }: SidebarProps) => {
  return (
    <StyledDrawer
      variant='permanent'
      open={open}
      drawerWidth={drawerWidth}
      PaperProps={{ sx: { backgroundColor: '#F7F7FA' } }}
    >
      <DrawerHeader to='/home'>
        <LogoWrapper>
          <Logo src='src\assets\logo.jpg' alt='logo' />
          <Typography variant='h6'>Orchidify</Typography>
        </LogoWrapper>
      </DrawerHeader>
      <Divider />
      <OptionList open={open} />
      <Button
        endIcon={<Logout />}
        sx={{
          width: '300px',
          color: '#ff022399',
          position: 'fixed',
          bottom: 10,
          textTransform: 'none',
          fontFamily: 'inherit',
          alignSelf: 'center',
          ':hover': { backgroundColor: 'none' },
          justifyContent: 'space-around'
        }}
        // onClick={logout}
      >
        Đăng xuất
      </Button>
    </StyledDrawer>
  )
}

export default Sidebar
