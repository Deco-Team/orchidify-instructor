import { Timestamp } from 'firebase/firestore'

export interface NotificationDto {
  id: string
  body: string
  data: {
    id: string
    type: string
  }
  receiverIds: string[]
  title: string
  createdAt: Timestamp
}
