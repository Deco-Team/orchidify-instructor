export enum InstructorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  REQUESTING = 'REQUESTING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum ClassStatus {
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
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
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export const CourseType = [
  {
    groupName: 'Lan rừng',
    groupItems: ['Lan phi điệp', 'Lan hải yến']
  },
  {
    groupName: 'Lan công nghiệp',
    groupItems: ['Dendrobium', 'Cattleya', 'Lan hồ điệp']
  },
  {
    groupName: 'Quá trình',
    groupItems: ['Cây con', 'Cây trưởng thành', 'Ra hoa', 'Hoa tàn']
  },
  {
    groupName: 'Phương pháp',
    groupItems: ['Tạo hình', 'Tách chiết', 'Chiết ghép', 'Cấy mô']
  }
]

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
