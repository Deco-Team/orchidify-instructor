import { z } from 'zod'
import { APP_MESSAGE } from '~/global/app-message'
import { SlotNumber, Weekday } from '~/global/constants'

export interface PublishClasDto {
  description: string
  startDate: string
  duration: number
  weekdays: Weekday[]
  slotNumbers: SlotNumber[]
}

export const ONE_MONTH_ADDITIONAL = new Date(new Date().setMonth(new Date().getMonth() + 1))
export const THREE_MONTH_ADDITIONAL = new Date(new Date().setMonth(new Date().getMonth() + 3))

const stripTime = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const publishClassSchema = z.object({
  description: z.string().trim().min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả yêu cầu')),
  startDate: z.string().refine(
    (dateStr) => {
      const date = stripTime(new Date(dateStr))
      const minDate = stripTime(ONE_MONTH_ADDITIONAL)
      const maxDate = stripTime(THREE_MONTH_ADDITIONAL)
      return date >= minDate && date <= maxDate
    },
    {
      message: APP_MESSAGE.VALUE_OUT_OF_RANGE(
        ONE_MONTH_ADDITIONAL.toLocaleDateString('vi-VN'),
        THREE_MONTH_ADDITIONAL.toLocaleDateString('vi-VN')
      )
    }
  ),
  duration: z.coerce
    .number()
    .int()
    .min(1, APP_MESSAGE.VALUE_OUT_OF_RANGE('1 tuần', '12 tuần'))
    .max(12, APP_MESSAGE.VALUE_OUT_OF_RANGE('1 tuần', '12 tuần')),
  weekdays: z.array(z.string()).min(1, APP_MESSAGE.REQUIRED_FIELD('Ngày học trong tuần')),
  slotNumbers: z.array(z.coerce.number()).min(1, APP_MESSAGE.REQUIRED_FIELD('Tiết học'))
})
