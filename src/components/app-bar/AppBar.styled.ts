import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean
  drawerwidth: number
}

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<StyledAppBarProps>(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))
