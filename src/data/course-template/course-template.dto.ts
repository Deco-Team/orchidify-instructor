import { CourseLevel, CourseTemplateStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'

export type CourseTemplateListItemResponseDto = {
  _id: string
  title: string
  price: number
  level: CourseLevel
  type: string
  status: CourseTemplateStatus
  learnerLimit: number
}

export type CourseTemplateDetailResponseDto = {
  _id: string
  title: string
  description: string
  price: number
  level: CourseLevel
  type: string
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseTemplateStatus
  learnerLimit: number
  instructorId: string
  lessons: LessonDto[]
  assignments: AssignmentDto[]
}

export interface LessonDto {
  _id: string
  title: string
  description: string
  media: BaseMediaDto[]
}

export interface AssignmentDto {
  _id: string
  title: string
  description: string
  attachment: BaseMediaDto[]
}
