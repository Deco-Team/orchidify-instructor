import { CourseLevel, CourseStatus } from '~/global/constants'

export interface CourseDto {
  _id?: string
  title: string
  description: string
  price: number
  level: CourseLevel
  duration?: number
  type: string
  thumbnail: string
  media: MediaDto[]
  status?: CourseStatus
  learnerLimit: number
  learnerQuantity?: number
  gardenId?: string
  lessons: LessonDto[]
  assignments: AssignmentDto[]
}

export interface LessonDto {
  title: string
  description: string
  media: MediaDto[]
}

export interface AssignmentDto {
  title: string
  description: string
  attachment: MediaDto[]
}

export interface MediaDto {
  asset_id: string
  public_id: string
  format: string
  resource_type: string
  createAt: string
  type: 'authenticated' | 'upload' | 'private'
  url: string
  asset_folder: string
  original_filename: string
  original_extension: string
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
