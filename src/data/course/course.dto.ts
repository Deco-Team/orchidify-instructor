import { CourseLevel, CourseStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'

export type CourseListItemResponseDto = {
  _id: string
  code: string
  title: string
  price: number
  level: CourseLevel
  type: string[]
  status: CourseStatus
  learnerLimit: number
  rate: number
}

export type CourseDetailResponseDto = {
  _id: string
  code: string
  title: string
  description: string
  price: number
  level: CourseLevel
  type: string[]
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  instructorId: string
  lessons: LessonDto[]
  assignments: AssignmentDto[]
  rate: number
  gardenRequiredToolkits: string
}

export interface LessonDto {
  _id: string
  index: number
  title: string
  description: string
  media: BaseMediaDto[]
}

export interface AssignmentDto {
  _id: string
  index: number
  title: string
  description: string
  attachments: BaseMediaDto[]
}
