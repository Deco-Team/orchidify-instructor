import { RequestType, CourseLevel, RequestStatus, SlotNumber, Weekday, CourseStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'
import { SessionDto } from '../course/course.dto'

export type AvailableTimeResponse = {
  slotNumbers: SlotNumber[]
}

export type ClassRequestListItemResponseDto = {
  _id: string
  type: RequestType
  description: string
  status: RequestStatus
  metadata: BaseClassRequestMetadataDto
  createdBy: string
  createdAt: Date
  updatedAt: Date
  rejectReason?: string
  courseId?: string
  classId?: string
}

export type BaseClassRequestMetadataDto = {
  _id: string
  code: string
  title: string
  description: string
  startDate: Date
  duration: number
  price: number
  level: CourseLevel
  type: string[]
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  learnerQuantity: number
  weekdays: Weekday[]
  slotNumbers: SlotNumber[]
  sessions: SessionDto[]
  gardenRequiredToolkits: string
  histories: unknown[]
  instructorId: string
  createdAt: Date
  updatedAt: Date
  courseId: string
  cancelReason?: string
  gardenId?: string
  rate?: number
}
