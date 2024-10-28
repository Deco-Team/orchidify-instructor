import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { SlotDto, TeachingTimesheetItemResponseDto } from '~/data/teaching-timesheet/teaching-timesheet.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/garden-timesheets/instructor'

export const useTimesheetApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getTeachingTimesheet = useCallback(
    async (date: string, type: string) => {
      const endpoint = `${ROOT_ENDPOINT}/teaching-timesheet`
      const result = await callAppProtectedApi<{ docs: TeachingTimesheetItemResponseDto[] }>(
        endpoint,
        'GET',
        {},
        { date, type },
        {}
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('lịch dạy') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getSlotById = useCallback(
    async (slotId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/slots/${slotId}`
      const result = await callAppProtectedApi<SlotDto>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết tiết học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getTeachingTimesheet, getSlotById }
}
