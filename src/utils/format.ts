import { CourseLevel } from '~/global/constants'

export const formatNumber = (num: number): string => {
  const numStr = num.toString()
  const formattedNum: string[] = []
  const len = numStr.length
  for (let i = len - 1; i >= 0; i--) {
    formattedNum.push(numStr[i])
    if ((len - i) % 3 === 0 && i > 0) {
      formattedNum.push('.')
    }
  }
  return formattedNum.reverse().join('')
}

export function formatCurrency(value: number, currency: string = 'VND', locale: string = 'vi-VN'): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  })
  return formatter.format(value)
}

export function formatCourseLevel(level: CourseLevel): string {
  switch (level) {
    case CourseLevel.BASIC:
      return 'Cơ bản'
    case CourseLevel.INTERMEDIATE:
      return 'Trung bình'
    case CourseLevel.ADVANCED:
      return 'Nâng cao'
    default:
      return 'Chưa xác định'
  }
}
