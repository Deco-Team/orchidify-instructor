export interface TeachingTimesheetItemResponseDto {
  _id: string
  slotNumber?: number
  start: Date
  end: Date
  classId?: string
  metadata?: {
    code: string
    title: string
    sessionNumber: number
    sessionTitle: string
  }
  hasTakenAttendance?: boolean
  createdAt: Date
  updatedAt: Date
  garden: {
    name: string
  }
}

export interface SlotDto extends TeachingTimesheetItemResponseDto {
  slotNumber: number
  class: {
    code: string
    title: string
    learnerLimit: number
    learnerQuantity: number
    course: {
      code: string
    }
  }
}
