import { InstructorStatus } from '~/global/constants'

export interface InstructorDto {
  email: string
  _id: string
  name: string
  phone: string
  dateOfBirth: Date
  bio: string
  avatar: string
  status: InstructorStatus
  balance: number
  paymentInfo: PaymentInfoDto
}

interface PaymentInfoDto {
  bankName: string
  bankShortName: string
  bankCode: string
  accountNumber: string
  accountName: string
}