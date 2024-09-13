import styled from '@emotion/styled'
import { styled as muiStyled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import { Link } from 'react-router-dom'

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
`

export const Logo = styled.img`
  border-radius: 100px;
  height: 3rem;
  object-fit: cover;
  margin: 0 1rem;
`
export const DrawerHeader = muiStyled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  textDecoration: 'none',
  color: 'inherit',
  ...theme.mixins.toolbar
}))

interface StyledDrawerProps extends MuiDrawerProps {
  open?: boolean
  drawerwidth: number
}

export const StyledDrawer = muiStyled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<StyledDrawerProps>(({
  theme,
  open,
  drawerwidth
}) => {
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerwidth,
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

  return {
    width: drawerwidth,
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
  }
})
