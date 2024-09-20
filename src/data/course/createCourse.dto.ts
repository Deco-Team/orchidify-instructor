import { z } from 'zod'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { APP_MESSAGE } from '~/global/app-message'
import { formatCurrency } from '~/utils/format'

export type CreateCourseDto = {
  title: string
  description: string
  price: number
  level: string
  type: string
  thumbnail: CloudinaryFileUploadedInfo[]
  media: CloudinaryFileUploadedInfo[]
  learnerLimit: number
  lessons: {
    title: string
    description: string
    mediaVideo: CloudinaryFileUploadedInfo[]
    mediaImages: CloudinaryFileUploadedInfo[]
  }[]
  assignments: {
    title: string
    description: string
    attachment: CloudinaryFileUploadedInfo[]
  }[]
}

export const createCourseSchema = z.object({
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
    .number()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Giá'))
    .max(10000000, APP_MESSAGE.VALUE_OUT_OF_RANGE(0, formatCurrency(10000000))),
  level: z.string().trim().min(1, APP_MESSAGE.REQUIRED_FIELD('Cấp độ')),
  type: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Thể loại'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Thể loại', 50)),
  thumbnail: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Thumbnail')),
  media: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Hình ảnh khóa học')),
  learnerLimit: z.coerce
    .number()
    .int()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Giới hạn học viên'))
    .min(10, APP_MESSAGE.VALUE_OUT_OF_RANGE(10, 30))
    .max(30, APP_MESSAGE.VALUE_OUT_OF_RANGE(10, 30)),
  lessons: z
    .array(
      z.object({
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
        mediaImages: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Tài nguyên bài học'))
      })
    )
    .min(3, APP_MESSAGE.VALUE_OUT_OF_RANGE(3, 10))
    .max(10, APP_MESSAGE.VALUE_OUT_OF_RANGE(3, 10)),
  assignments: z
    .array(
      z.object({
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
        attachment: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Tài liệu'))
      })
    )
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Bài tập'))
    .max(3, APP_MESSAGE.VALUE_OUT_OF_RANGE(1, 3))
})
