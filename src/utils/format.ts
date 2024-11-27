import { RequestType, CourseLevel, Weekday, NotificationType } from '~/global/constants'

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

export function formatRequestType(type: RequestType): string {
  switch (type) {
    case RequestType.PUBLISH_CLASS:
      return 'Mở lớp học'
    case RequestType.CANCEL_CLASS:
      return 'Hủy lớp học'
    default:
      return 'Chưa xác định'
  }
}

export function convertArrayToString(arr: string[] | number[]): string {
  return arr.join(', ')
}

export function convertStringToArray(str: string): string[] {
  return str.split(',').map((item) => item.trim())
}

export function formatWeekdays(weekdays: Weekday[]): string[] {
  return weekdays.map((weekday) => {
    switch (weekday) {
      case Weekday.MONDAY:
        return 'T2'
      case Weekday.TUESDAY:
        return 'T3'
      case Weekday.WEDNESDAY:
        return 'T4'
      case Weekday.THURSDAY:
        return 'T5'
      case Weekday.FRIDAY:
        return 'T6'
      case Weekday.SATURDAY:
        return 'T7'
      case Weekday.SUNDAY:
        return 'CN'
      default:
        return 'Chưa xác định'
    }
  })
}

export function formatNotificationType(type: string): string {
  switch (type) {
    case NotificationType.CLASS:
      return 'classes'
    case NotificationType.CLASS_REQUEST:
      return 'class-requests'
    case NotificationType.PAYOUT_REQUEST:
      return 'payout-requests'
    default:
      return ''
  }
}
