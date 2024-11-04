import { AttendanceStatus } from '~/global/constants'
import { SlotDto } from './teaching-timesheet.dto'
import { LearnerDetailResponseDto } from '../learner/learner.dto'

export interface AttendanceListResponseDto {
  slot: SlotDto
  docs: AttendanceListItemResponseDto[]
}

export interface AttendanceListItemResponseDto {
  _id: string
  status: AttendanceStatus
  note: string
  learnerId: string
  learner: LearnerDetailResponseDto
  createdAt: Date
  updatedAt: Date
}
