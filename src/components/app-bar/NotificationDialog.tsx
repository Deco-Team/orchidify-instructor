import { memo } from 'react'
import { getRegistrationToken } from '~/utils/firebase/cloud-messaging'

const NotificationDialog = memo(() => {
  getRegistrationToken()
  return <></>
})

export default NotificationDialog
