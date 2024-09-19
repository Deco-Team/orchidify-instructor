import { CourseLevel, CourseStatus } from '~/global/constants'
import { BaseMediaDto } from './common.dto'
import { BaseLessonDto } from './lesson.dto'
import { BaseAssignmentDto } from './assignment.dto'

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

export type CourseDetailResponseDto = {
  _id: string
  title: string
  description: string
  startDate: string
  price: number
  level: CourseLevel
  type: string
  duration: number
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  learnerQuantity: number
  gardenId: string
  lessons: BaseLessonDto[]
  assignments: BaseAssignmentDto[]
  createdAt: string
  updatedAt: string
}
