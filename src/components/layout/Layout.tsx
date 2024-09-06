import { ReactNode, useState } from 'react'
import AppBar from '../app-bar/AppBar'
import Box from '@mui/material/Box'
import Sidebar from '../sidebar/Sidebar'

const DRAWER_WIDTH = 250

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(true)

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} drawerWidth={DRAWER_WIDTH} handleDrawer={handleDrawer} />
      <Sidebar open={open} drawerWidth={DRAWER_WIDTH} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
