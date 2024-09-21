import { CourseLevel, CourseStatus } from '~/global/constants'
import { BaseMediaDto } from '../common.dto'

export interface CourseDto {
  _id?: string
  title: string
  description: string
  startDate: string
  price: number
  level: CourseLevel
  duration?: number
  type: string
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  learnerQuantity?: number
  gardenId?: string
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

export type CourseListItemResponseDto = {
  _id: string
  title: string
  startDate: string
  price: number
  level: CourseLevel
  type: string
  duration: number
  status: CourseStatus
  learnerLimit: number
  learnerQuantity: number
  createdAt: string
  updatedAt: string
}
