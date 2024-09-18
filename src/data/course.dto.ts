import { CourseLevel, CourseStatus } from '~/global/constants'

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
