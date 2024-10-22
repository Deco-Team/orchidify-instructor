import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'
import { AvailableTimeResponse, ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { SlotNumber, Weekday } from '~/global/constants'
import { IdResponseDto, ListResponseDto } from '~/data/common.dto'

const TIMESHEET_ENDPOINT = '/garden-timesheets/instructor'
const CLASS_REQUEST_ENDPOINT = '/class-requests/instructor'

interface CreatePublishClassRequest {
  description: string
  courseId: string
  startDate: Date
  weekdays: Weekday[]
  slotNumbers: SlotNumber[]
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

  const getClassRequestList = useCallback(
    async (
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
      filters: { field: string; value: unknown }[] = []
    ) => {
      const endpoint = `${CLASS_REQUEST_ENDPOINT}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')
      let filtersFormat = {}
      filters.forEach((filter) => {
        filtersFormat = Object.assign({ [filter.field]: filter.value }, filtersFormat)
      })
      const result = await callAppProtectedApi<ListResponseDto<ClassRequestListItemResponseDto>>(
        endpoint,
        'GET',
        {},
        {
          page,
          limit: pageSize,
          sort: sortingFormat,
          ...filtersFormat
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách yêu cầu') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getAvailableTime,
    createPublishClassRequest,
    getClassRequestList
  }
}
