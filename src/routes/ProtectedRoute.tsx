import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'
import { publicRoute } from './routes'
import { getRegistrationToken } from '~/utils/firebase/cloud-messaging'
import { useNotificationApi } from '~/hooks/api/useNotificationApi'
import getBrowserAndOS from '~/utils/getBrowserAndOS'

interface ProtectedRouteProps {
  element: ReactNode
  name?: string
}

export default function ProtectedRoute({ element, name }: ProtectedRouteProps) {
  const { userTokenPayload } = useAuth()
  const { registerUserDevice } = useNotificationApi()

  useEffect(() => {
    if (name) document.title = name
  }, [name])

  useEffect(() => {
    if (userTokenPayload) {
      ;(async () => {
        const fcmToken = await getRegistrationToken()

        if (fcmToken) {
          const currentToken = localStorage.getItem('fcm_token')
          if (!currentToken || currentToken !== fcmToken) {
            const { browser, os } = getBrowserAndOS()
            registerUserDevice({ fcmToken, browser, os })
            localStorage.setItem('fcm_token', fcmToken)
          }
        }
      })()
    }
  }, [])

  if (!userTokenPayload) {
    return <Navigate to={publicRoute.login.path} replace={true} />
  }

  return <Layout>{element}</Layout>
}
