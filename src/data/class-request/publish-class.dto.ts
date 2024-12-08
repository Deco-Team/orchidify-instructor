import { z } from 'zod'
import { APP_MESSAGE } from '~/global/app-message'

export interface PublishClasDto {
  description: string
  startDate: string
  weekdaysString: string
  slotNumber: number
}

export const ONE_MONTH_ADDITIONAL = new Date(new Date().setMonth(new Date().getMonth() + 1))
export const THREE_MONTH_ADDITIONAL = new Date(new Date().setMonth(new Date().getMonth() + 3))

const stripTime = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const publishClassSchema = z.object({
  description: z.string().trim().min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả yêu cầu')),
  startDate: z
    .string()
    .refine(
      (dateStr) => {
        const date = stripTime(new Date(dateStr))
        const minDate = stripTime(/* ONE_MONTH_ADDITIONAL */ new Date())
        const maxDate = stripTime(THREE_MONTH_ADDITIONAL)
        return date >= minDate && date <= maxDate
      },
      {
        message: APP_MESSAGE.VALUE_OUT_OF_RANGE(
          ONE_MONTH_ADDITIONAL.toLocaleDateString('vi-VN'),
          THREE_MONTH_ADDITIONAL.toLocaleDateString('vi-VN')
        )
      }
    )
    .refine(
      (dateStr) => {
        const date = new Date(dateStr)
        return date.getDay() !== 0
      },
      { message: APP_MESSAGE.VALUE_OUT_OF_RANGE('T2', 'T7') }
    ),

  weekdaysString: z.string().trim(),
  slotNumber: z.coerce.number().min(1, APP_MESSAGE.REQUIRED_FIELD('Tiết học'))
})
