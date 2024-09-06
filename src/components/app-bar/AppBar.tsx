import { Badge, Box, IconButton, Toolbar } from '@mui/material'
import { StyledAppBar } from './AppBar.styled'
import { Menu, Notifications, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

interface AppBarProps {
  open: boolean
  drawerWidth: number
  handleDrawer: () => void
}

const AppBar = ({ open, drawerWidth, handleDrawer }: AppBarProps) => {
  return (
    <StyledAppBar
      position='fixed'
      elevation={0}
      open={open}
      drawerWidth={drawerWidth}
      sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #0000001e' }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawer}
          edge='start'
          sx={{
            marginRight: 5,
            color: '#2EC4B6'
          }}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='error'>
              <Notifications sx={{ color: '#2EC4B6' }} />
            </Badge>
          </IconButton>
          <IconButton size='large' edge='end' color='inherit' component={Link} to='/profile'>
            <AccountCircle sx={{ color: '#2EC4B6' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default AppBar
