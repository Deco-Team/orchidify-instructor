import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { AttendanceListResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { SuccessResponseDto } from '~/data/common.dto'
import { AttendanceStatus } from '~/global/constants'

const ROOT_ENDPOINT = '/attendances/instructor'

export interface TakeAttendanceDto {
  status: AttendanceStatus
  note: string
  learnerId: string
}

export const useAttendanceApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAttendanceList = useCallback(
    async (slotId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${slotId}`
      const result = await callAppProtectedApi<AttendanceListResponseDto>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách điểm danh') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const takeAttendance = useCallback(
    async (slotId: string, attendances: TakeAttendanceDto[]) => {
      const endpoint = `${ROOT_ENDPOINT}/${slotId}`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'POST', {}, {}, { attendances })

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('điểm danh') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getAttendanceList, takeAttendance }
}
