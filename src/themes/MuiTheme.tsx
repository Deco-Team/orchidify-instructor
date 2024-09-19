import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

declare module '@mui/material/styles' {
  interface Theme {
    label: {
      secondary: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    label?: {
      secondary?: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ec4b6',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#5b72ee',
      contrastText: '#ffffff'
    },
    info: {
      main: '#aeaeb2',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f88C3D',
      contrastText: '#ffffff'
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
        root: {
          padding: '8px 22px'
        },
        sizeLarge: {
          height: '50px'
        },
        sizeMedium: {
          height: '36px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
          padding: '2px 8px',
          borderRadius: '4px',
          '& .MuiChip-label': {
            fontSize: '14px',
            fontWeight: 500,
            padding: 0
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: '#2ec4b6',
          color: '#2ec4b6',
          '&.Mui-selected': {
            backgroundColor: '#2ec4b6',
            color: '#ffffff'
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#2ec4b6'
          }
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
