import { LearnerStatus } from '~/global/constants'

export type LearnerDetailResponseDto = {
  _id: string
  email: string
  name: string
  avatar?: string
  dateOfBirth: string
  phone: string
  status: LearnerStatus
  createdAt: string
  updatedAt: string
}
