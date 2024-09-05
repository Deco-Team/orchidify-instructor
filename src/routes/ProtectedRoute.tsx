import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Sidebar from '~/components/sidebar/Sidebar'

interface ProtectedRouteProps {
  Component: () => JSX.Element
}

export default function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <Sidebar>
      <Component />
    </Sidebar>
  )
}
