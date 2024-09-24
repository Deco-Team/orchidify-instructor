import { CourseLevel, CourseTemplateStatus } from '~/global/constants'

export type CourseTemplateListItemResponseDto = {
  id: string
  title: string
  price: number
  level: CourseLevel
  type: string
  status: CourseTemplateStatus
  learnerLimit: number
}
