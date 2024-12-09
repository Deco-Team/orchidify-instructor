import { z } from 'zod'
import { APP_MESSAGE } from '~/global/app-message'
import { formatCurrency } from '~/utils/format'
import { BaseMediaDto } from '../common.dto'

export type UpdateCourseDto = {
  title: string
  description: string
  price: number
  level: string
  type: string[]
  duration: number
  thumbnail: BaseMediaDto[]
  media: BaseMediaDto[]
  learnerLimit: number
  sessions: {
    _id?: string
    title: string
    description: string
    mediaVideo: BaseMediaDto[]
    mediaImages: BaseMediaDto[]
    assignments?: {
      _id?: string
      title: string
      description: string
      attachments: BaseMediaDto[]
    }[]
  }[]
  gardenRequiredToolkits: string[]
}

export const updateCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên khóa học'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên khóa học', 50)),
  description: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả', 500)),
  price: z.coerce
    .number({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .int({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .min(100000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(100000), formatCurrency(10000000)))
    .max(10000000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(100000), formatCurrency(10000000))),
  level: z.string().trim().min(1, APP_MESSAGE.REQUIRED_FIELD('Cấp độ')),
  type: z.array(z.string().trim()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Thể loại')),
  duration: z.coerce
    .number({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .int({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .min(1, APP_MESSAGE.VALUE_OUT_OF_RANGE(1, 12))
    .max(12, APP_MESSAGE.VALUE_OUT_OF_RANGE(1, 12)),
  thumbnail: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Thumbnail')),
  media: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Hình ảnh khóa học')),
  learnerLimit: z.coerce
    .number()
    .int()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Giới hạn học viên'))
    .min(10, APP_MESSAGE.VALUE_OUT_OF_RANGE(10, 30))
    .max(30, APP_MESSAGE.VALUE_OUT_OF_RANGE(10, 30)),
  sessions: z.array(
    z.object({
      _id: z.string().optional(),
      title: z
        .string()
        .trim()
        .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên bài học'))
        .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên bài học', 50)),
      description: z
        .string()
        .trim()
        .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả bài học'))
        .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả bài học', 500)),
      mediaVideo: z.array(z.object({}).passthrough()),
      mediaImages: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Tài nguyên bài học')),
      assignments: z
        .array(
          z.object({
            _id: z.string().optional(),
            title: z
              .string()
              .trim()
              .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên bài tập'))
              .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên bài tập', 50)),
            description: z
              .string()
              .trim()
              .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả bài tập'))
              .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả bài tập', 500)),
            attachments: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Tài liệu'))
          })
        )
        .optional()
    })
  ),
  gardenRequiredToolkits: z.array(z.string().trim()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Dụng cụ cần thiết'))
})
