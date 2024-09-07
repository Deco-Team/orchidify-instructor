import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ec4b6',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#5b72ee'
    },
    info: {
      main: '#aeaeb2'
    },
    warning: {
      main: '#f88C3D'
    },
    error: {
      main: '#f66868',
      contrastText: '#ffffff'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        sizeLarge: {
          height: '50px'
        },
        sizeMedium: {
          height: '36px'
        }
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      color: '#ffffff'
    }
  }
})

interface MuiThemeProps {
  children: ReactNode
}

export default function MuiTheme({ children }: MuiThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
