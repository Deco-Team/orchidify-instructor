import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'
import { publicRoute } from './routes'

interface ProtectedRouteProps {
  element: ReactNode
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { userTokenPayload } = useAuth()

  if (!userTokenPayload) {
    return <Navigate to={publicRoute.login.path} replace={true} />
  }

  return <Layout>{element}</Layout>
}
