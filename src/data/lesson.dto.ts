import { BaseMediaDto } from './common.dto'

export type BaseLessonDto = {
  _id: string
  title: string
  description: string
  media: BaseMediaDto[]
}
