import * as React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, useLocation } from 'react-router-dom'
import { Options } from './Option'
// import Logout from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NotificationsIcon from '@mui/icons-material/Notifications'

const drawerWidth = 250

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

//Logo above drawer
const DrawerHeader = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  textDecoration: 'none',
  color: 'inherit',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

//Appbar transition
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

type Props = {
  children: React.ReactNode
}

const Sidebar = ({ children }: Props) => {
  const [open, setOpen] = React.useState(true)
  const [btn, setButton] = React.useState<number | null>(null) //dashboard is default option

  const handleDrawer = () => {
    setOpen(!open)
  }

  const handleClick = (id: number) => {
    setButton(id)
  }

  const location = useLocation()
  React.useEffect(() => {
    const option = Options.find((option) => location.pathname.includes(`/${option.link}`))
    if (option) {
      setButton(option.id)
    } else {
      setButton(null)
    }
  }, [location])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        elevation={0}
        open={open}
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
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon sx={{ color: '#2EC4B6' }} />
              </Badge>
            </IconButton>
            <IconButton size='large' edge='end' color='inherit' component={Link} to='/profile'>
              <AccountCircleIcon sx={{ color: '#2EC4B6' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open} PaperProps={{ sx: { backgroundColor: '#F7F7FA' } }}>
        <DrawerHeader to='/home'>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <Typography variant='h6'>Orchidify</Typography>
        </DrawerHeader>
        <Divider />
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <List>
            {Options.map((option) => (
              <ListItem
                key={option.id}
                disablePadding
                sx={{
                  display: 'block',
                  borderLeft: option.id === btn ? 4 : 0,
                  borderColor: '#2EC4B6',
                  bgcolor: option.id === btn ? '#FFFFFF' : 'inherit'
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  onClick={() => handleClick(option.id)}
                  component={Link}
                  to={`/${option.link}`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 24,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: option.id === btn ? '#2EC4B6' : '#3c3c4399'
                    }}
                  >
                    {React.createElement(option.icon)}
                  </ListItemIcon>
                  <ListItemText
                    primary={option.text}
                    primaryTypographyProps={{ fontWeight: 500, color: option.id === btn ? '#2EC4B6' : '#3c3c4399' }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
