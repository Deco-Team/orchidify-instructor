import { RequestType, CourseLevel, CourseStatus, RequestStatus, SlotNumber, Weekday } from '~/global/constants'
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
  createdAt: string
  updatedAt: string
  rejectReason?: string
  courseId?: string
  classId?: string
}

export type BaseClassRequestMetadataDto = {
  _id: string
  code: string
  title: string
  description: string
  startDate: string
  duration: number
  price: number
  level: CourseLevel
  type: string[]
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  sessions: SessionDto[]
  gardenRequiredToolkits: string
  histories: Array<unknown>
  instructorId: string
  createdAt: string
  updatedAt: string
  courseId?: string
  cancelReason?: string
  gardenId?: string
  rate?: number
}
