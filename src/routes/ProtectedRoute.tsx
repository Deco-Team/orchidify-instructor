import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'
import { publicRoute } from './routes'

interface ProtectedRouteProps {
  element: ReactNode
  name?: string
}

export default function ProtectedRoute({ element, name }: ProtectedRouteProps) {
  const { userTokenPayload } = useAuth()

  useEffect(() => {
    if (name) document.title = name
  }, [name])

  if (!userTokenPayload) {
    return <Navigate to={publicRoute.login.path} replace={true} />
  }

  return <Layout>{element}</Layout>
}
