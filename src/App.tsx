import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import MuiTheme from './themes/MuiTheme'
import { Route, Routes } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider'
import { publicRoute, protectedRoute } from './routes/routes'
import ProtectedRoute from './routes/ProtectedRoute'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <MuiTheme>
        <AuthProvider>
          <Routes>
            {Object.entries(publicRoute).map(([, { path, component }]) => (
              <Route key={path} path={path} Component={component} />
            ))}
            {Object.entries(protectedRoute).map(([, { path, component }]) => (
              <Route key={path} path={path} element={<ProtectedRoute Component={component} />} />
            ))}
          </Routes>
        </AuthProvider>
      </MuiTheme>
    </>
  )
}

export default App
