import { CourseLevel, ClassStatus, Weekday, SlotNumber, LearnerStatus, SubmissionStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'
import { SessionDto } from '../course/course.dto'
import { LearnerDetailResponseDto } from '../learner/learner.dto'

export type ClassListItemResponseDto = {
  _id: string
  code: string
  title: string
  startDate: string
  price: number
  level: CourseLevel
  type: Array<string>
  duration: number
  thumbnail: string
  status: ClassStatus
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  rate?: number
}

type ClassStatusHistoryDto = {
  [key: string]: unknown
}

export type ClassLearnerDto = {
  _id: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
  status: LearnerStatus
  createdAt: string
  updatedAt: string
  avatar: string
}

export type ClassDetailResponseDto = {
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
  histories: Array<ClassStatusHistoryDto>
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  gardenRequiredToolkits: string
  learners: Array<ClassLearnerDto>
  instructorId: string
  gardenId: string
  garden: {
    name: string
  }
  courseId: string
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  rate?: number
  ratingSummary?: RatingSummaryDto
  cancelReason?: string
}

export type AssignmentSubmissionItemResponseDto = {
  _id: string
  learner: LearnerDetailResponseDto
  submission?: BaseAssignmentSubmissionDto
}

export type BaseAssignmentSubmissionDto = {
  _id: string
  attachments: BaseMediaDto[]
  point?: number
  feedback?: string
  status: SubmissionStatus
  learner: LearnerDetailResponseDto
  createdAt: Date
  updatedAt: Date
}

interface RatingSummaryDto {
  totalSum: number
  totalCount: number
  totalCountByRate: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}
