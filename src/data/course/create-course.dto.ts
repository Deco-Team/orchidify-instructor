import { z } from 'zod'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { APP_MESSAGE } from '~/global/app-message'
import { formatCurrency } from '~/utils/format'

export type CreateCourseDto = {
  title: string
  description: string
  price: number
  level: string
  type: string[]
  duration: number
  thumbnail: CloudinaryFileUploadedInfo[]
  media: CloudinaryFileUploadedInfo[]
  learnerLimit: number
  sessions: {
    title: string
    description: string
    mediaVideo: CloudinaryFileUploadedInfo[]
    mediaImages: CloudinaryFileUploadedInfo[]
    assignments?: {
      title: string
      description: string
      attachments: CloudinaryFileUploadedInfo[]
    }[]
  }[]

  gardenRequiredToolkits: string[]
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
    .min(1000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(1000), formatCurrency(10000000)))
    .max(10000000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(1000), formatCurrency(10000000))),
  level: z.string().trim().min(1, APP_MESSAGE.REQUIRED_FIELD('Cấp độ')),
  type: z.array(z.string().trim()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Thể loại')),
  duration: z.coerce
    .number()
    .int()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Thời lượng'))
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
        .optional() // Mark assignments as optional
    })
  ),
  gardenRequiredToolkits: z.array(z.string().trim()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Dụng cụ cần thiết'))
})
