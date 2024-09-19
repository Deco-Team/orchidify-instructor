import { BaseMediaDto } from './common.dto'

export type BaseAssignmentDto = {
  _id: string
  title: string
  description: string
  attachment: BaseMediaDto[]
}
