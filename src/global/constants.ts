export enum InstructorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum LearnerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  // REQUESTING = 'REQUESTING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum ClassStatus {
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export enum SubmissionStatus {
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED'
}

export enum CourseLevel {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED'
}

export enum AttendanceStatus {
  NOT_YET = 'NOT_YET',
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT'
}

export enum Weekday {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export enum SlotNumber {
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export const FileSize = {
  '5MB': { text: '5MB', size: 1024 * 1024 * 5 },
  '20MB': { text: '20MB', size: 1024 * 1024 * 20 },
  '100MB': { text: '100MB', size: 1024 * 1024 * 100 }
}

export const FileFormat = {
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png',
  video: 'mp4',
  doc: 'doc',
  docx: 'docx',
  pdf: 'pdf'
}

export enum RequestType {
  PUBLISH_CLASS = 'PUBLISH_CLASS',
  CANCEL_CLASS = 'CANCEL_CLASS'
}

export enum CalendarType {
  MONTH = 'MONTH',
  WEEK = 'WEEK'
}

export enum NotificationType {
  CLASS = 'CLASS',
  CLASS_REQUEST = 'CLASS_REQUEST',
  PAYOUT_REQUEST = 'PAYOUT_REQUEST'
}

export enum ReportType {
  CourseSum = 'CourseSum',
  LearnerSum = 'LearnerSum',
  InstructorSum = 'InstructorSum',
  RecruitmentApplicationSum = 'RecruitmentApplicationSum',
  CourseComboSum = 'CourseComboSum',
  ClassSum = 'ClassSum',
  ClassRequestSum = 'RequestSum',
  PayoutRequestSum = 'PayoutRequestSum',
  RevenueSum = 'RevenueSum',

  LearnerSumByMonth = 'LearnerSumByMonth',
  InstructorSumByMonth = 'InstructorSumByMonth',
  LearnerEnrolledSumByMonth = 'LearnerEnrolledSumByMonth',
  RevenueSumByMonth = 'RevenueSumByMonth'
}
