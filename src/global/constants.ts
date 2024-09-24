export enum InstructorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum CourseTemplateStatus {
  DRAFT = 'DRAFT',
  REQUESTING = 'REQUESTING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum CourseStatus {
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
