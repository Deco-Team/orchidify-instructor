import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'

interface ProtectedRouteProps {
  Component: () => JSX.Element
}

export default function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to='/login' replace={true} />
  }

  return <Component />
}
