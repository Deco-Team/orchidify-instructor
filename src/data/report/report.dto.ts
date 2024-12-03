import { ClassStatus, CourseStatus, ReportType, RequestStatus } from '~/global/constants'

export interface TotalSummaryDto {
  _id: string
  type: ReportType
  data: {
    quantity?: number
    total?: number
  } & {
    [key: string]: { quantity: number }
  } & (
      | Record<ClassStatus, { quantity: number }>
      | Record<CourseStatus, { quantity: number }>
      | Record<RequestStatus, { quantity: number }>
    )
}

export interface ClassByStatusDto {
  quantity: number
  docs: {
    status: ClassStatus
    quantity: number
  }[]
}

export interface LearnerEnrolledByMonthDto {
  learner: {
    quantity: number
  }
}

export interface RevenueSumByMonthDto {
  revenue: {
    total: number
  }
}

export interface TransactionByMonthDto {
  _id: string
  quantity: number
  month: number
}

export interface TransactionByDateDto {
  _id: string
  date: string
  payoutAmount: number
}
