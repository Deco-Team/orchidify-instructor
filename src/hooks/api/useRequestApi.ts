import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'
import { AvailableTimeResponse } from '~/data/class-request/request.dto'
import { Weekday } from '~/global/constants'
import { IdResponseDto } from '~/data/common.dto'

const TIMESHEET_ENDPOINT = '/garden-timesheets/instructor'
const CLASS_REQUEST_ENDPOINT = '/class-requests/instructor'

interface CreatePublishClassRequest {
  description: string
  courseId: string
  startDate: Date
  duration: number
  weekdays: string[]
  slotNumbers: number[]
}

export const useRequestApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAvailableTime = useCallback(
    async (startDate: string, duration: number, weekdays: Weekday[]) => {
      const endpoint = `${TIMESHEET_ENDPOINT}/available-time`
      const result = await callAppProtectedApi<AvailableTimeResponse>(
        endpoint,
        'GET',
        {},
        {
          startDate: new Date(startDate).toISOString(),
          duration,
          weekdays
        },
        {}
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('dữ liệu tiết học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const createPublishClassRequest = useCallback(
    async (request: CreatePublishClassRequest) => {
      const endpoint = `${CLASS_REQUEST_ENDPOINT}/publish-class`

      const result = await callAppProtectedApi<IdResponseDto>(endpoint, 'POST', {}, {}, request)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Gửi yêu cầu mở') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getAvailableTime,
    createPublishClassRequest
  }
}
