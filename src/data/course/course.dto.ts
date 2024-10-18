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
  duration: number
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  learnerLimit: number
  instructorId: string
  sessions: SessionDto[]
  rate: number
  discount: number
  gardenRequiredToolkits: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface SessionDto {
  _id: string
  sessionNumber: number
  title: string
  description: string
  media: BaseMediaDto[]
  assignments: AssignmentDto[]
}

export interface AssignmentDto {
  _id: string
  title: string
  description: string
  attachments: BaseMediaDto[]
}

export interface CourseTypesResponstDto {
  groupName: string
  groupItems: string[]
}
