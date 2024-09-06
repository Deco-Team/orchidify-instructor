import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ec4b6'
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  }
})

interface MuiThemeProps {
  children: ReactNode
}

export default function MuiTheme({ children }: MuiThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
