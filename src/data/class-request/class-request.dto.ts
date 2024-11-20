import {
  RequestType,
  CourseLevel,
  RequestStatus,
  SlotNumber,
  Weekday,
  CourseStatus,
  ClassStatus
} from '~/global/constants'
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
  course?: {
    code: string
    title: string
  }
  cancelReason?: string
  gardenId?: string
  rate?: number
}

type ClassRequestStatusHistoryDto = {
  [key: string]: unknown
}

export type ClassRequestClassDto = {
  _id: string
  code: string
  title: string
  description: string
  startDate: string
  price: number
  level: CourseLevel
  type: Array<string>
  duration: number
  thumbnail: string
  media: Array<BaseMediaDto>
  sessions: Array<SessionDto>
  status: ClassStatus
  histories: Array<{ [key: string]: unknown }>
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  gardenRequiredToolkits: string
  instructorId: string
  gardenId: string
  courseId: string
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  rate?: number
  cancelReason?: string
}

export type ClassRequestDetailResponseDto = {
  _id: string
  type: RequestType
  description: string
  status: RequestStatus
  metadata: BaseClassRequestMetadataDto
  histories: Array<ClassRequestStatusHistoryDto>
  createdAt: string
  updatedAt: string
  rejectReason?: string
  courseId?: string
  classId?: string
  class?: ClassRequestClassDto
}
