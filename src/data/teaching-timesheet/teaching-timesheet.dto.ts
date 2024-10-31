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
}

export interface SlotDto extends TeachingTimesheetItemResponseDto {
  slotNumber: number
  hasTakenAttendance?: boolean
  garden: {
    name: string
  }
  class: {
    code: string
    title: string
    learnerLimit: number
    learnerQuantity: number
    course: {
      code: string
    }
  }
  createdAt: Date
  updatedAt: Date
}
