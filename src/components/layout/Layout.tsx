import { ReactNode, useState } from 'react'
import AppBar from '../app-bar/AppBar'
import { useTheme, Box } from '@mui/material'
import Sidebar from '../sidebar/Sidebar'

const DRAWER_WIDTH = 250

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(true)
  const theme = useTheme()

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} drawerwidth={DRAWER_WIDTH} handleDrawer={handleDrawer} />
      <Sidebar open={open} drawerwidth={DRAWER_WIDTH} />
      <Box
        component='main'
        sx={{
          ...(open
            ? { maxWidth: `calc(100% - ${DRAWER_WIDTH}px)` }
            : {
                maxWidth: `calc(100% - ${theme.spacing(7)} - 1px)`,
                [theme.breakpoints.up('sm')]: {
                  width: `calc(100% ${theme.spacing(8)} - 1px)`
                }
              }),
          flexGrow: 1,
          p: 3,
          mt: 8
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
