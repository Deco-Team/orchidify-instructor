import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'

interface ProtectedRouteProps {
  element: ReactNode
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to='/' replace={true} />
  }

  return <Layout>{element}</Layout>
}
