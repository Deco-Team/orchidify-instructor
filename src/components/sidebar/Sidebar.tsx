import { DrawerHeader, Logo, LogoWrapper, StyledDrawer } from './Sidebar.styled'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import OptionList from './OptionList'
import { Logout } from '@mui/icons-material'
import { useState } from 'react'
import useAuth from '~/auth/useAuth'
import LogoutConfirmation from '../modal/LogoutConfirmation'

interface SidebarProps {
  open: boolean
  drawerWidth: number
}

const Sidebar = ({ open, drawerWidth }: SidebarProps) => {
  const [openLogout, setOpenLogout] = useState(false)
  const { logout } = useAuth()

  const handleLogoutOpen = () => {
    setOpenLogout(!openLogout)
  }

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
      <List>
        <ListItem
          disablePadding
          sx={{
            display: 'block'
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            onClick={handleLogoutOpen}
          >
            <ListItemText
              primary={'Đăng xuất'}
              primaryTypographyProps={{ fontWeight: 500, color: '#F66868' }}
              sx={{ opacity: open ? 1 : 0 }}
            />
            <ListItemIcon
              sx={{
                minWidth: 24,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Logout sx={{ color: '#F66868' }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <LogoutConfirmation open={openLogout} handleClose={handleLogoutOpen} logout={logout} />
    </StyledDrawer>
  )
}

export default Sidebar
