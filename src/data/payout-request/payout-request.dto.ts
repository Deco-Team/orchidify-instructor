import { RequestStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'

export type PayoutRequestListItemResponseDto = {
  _id: string
  amount: number
  description: string
  status: RequestStatus
  hasMadePayout?: boolean
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
  hasMadePayout?: boolean
  transactionId?: string
  transactionCode: string
  attachment: BaseMediaDto
}
