import { z } from 'zod'
import { APP_MESSAGE } from '~/global/app-message'

export type CreateUpdateCourseComboDto = {
  title: string
  description: string
  discount: number
  childCourseIds: string[]
}

export const createUpdateCourseComboSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên Combo khoá học'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên Combo khoá học', 50)),
  description: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả Combo khoá học'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả Combo khóa học', 500)),
  discount: z.coerce
    .number({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .int({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .min(5, APP_MESSAGE.VALUE_OUT_OF_RANGE(5, 50))
    .max(50, APP_MESSAGE.VALUE_OUT_OF_RANGE(5, 50)),
  childCourseIds: z
    .array(z.string())
    .min(2, APP_MESSAGE.VALUE_OUT_OF_RANGE(2, 3))
    .max(3, APP_MESSAGE.VALUE_OUT_OF_RANGE(2, 3))
})
