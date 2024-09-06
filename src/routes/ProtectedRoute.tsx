import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'

interface ProtectedRouteProps {
  Component: () => JSX.Element
}

export default function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to='/login' replace={true} />
  }

  return (
    <Layout>
      <Component />
    </Layout>
  )
}
