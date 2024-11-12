import { RequestStatus } from '~/global/constants'

export type PayoutRequestListItemResponseDto = {
  _id: string
  amount: number
  description: string
  status: RequestStatus
  createdAt: Date
  updatedAt: Date
  rejectReason?: string
  createdBy: string
}

export type PayoutRequestDetailResponseDto = {
  _id: string
  amount: number
  status: RequestStatus
  description: string
  createdAt: Date
  updatedAt: Date
  rejectReason?: string
  createdBy: string
}
