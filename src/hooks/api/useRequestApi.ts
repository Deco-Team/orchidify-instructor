import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'
import {
  AvailableTimeResponse,
  ClassRequestDetailResponseDto,
  ClassRequestListItemResponseDto
} from '~/data/class-request/class-request.dto'
import { SlotNumber, Weekday } from '~/global/constants'
import { IdResponseDto, ListResponseDto, SuccessResponseDto } from '~/data/common.dto'
import {
  PayoutRequestDetailResponseDto,
  PayoutRequestListItemResponseDto
} from '~/data/payout-request/payout-request.dto'

const TIMESHEET_ENDPOINT = '/garden-timesheets/instructor'
const CLASS_REQUEST_ENDPOINT = '/class-requests/instructor'
const PAYOUT_REQUEST_ENDPOINT = '/payout-requests/instructor'

interface CreatePublishClassRequest {
  description: string
  courseId: string
  startDate: Date
  weekdays: Weekday[]
  slotNumbers: SlotNumber[]
}

interface CreateCancelClassRequest {
  classId: string
  description: string
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
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Gửi yêu cầu mở lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const createCancelClassRequest = useCallback(
    async (request: CreateCancelClassRequest) => {
      const endpoint = `${CLASS_REQUEST_ENDPOINT}/cancel-class`

      const result = await callAppProtectedApi<IdResponseDto>(endpoint, 'POST', {}, {}, request)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Gửi yêu cầu hủy lớp học') } as ErrorResponseDto
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

  const getClassRequestById = useCallback(
    async (requestId: string) => {
      const endpoint = `${CLASS_REQUEST_ENDPOINT}/${requestId}`
      const result = await callAppProtectedApi<ClassRequestDetailResponseDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết yêu cầu lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const cancelClassRequest = useCallback(
    async (requestId: string) => {
      const endpoint = `${CLASS_REQUEST_ENDPOINT}/${requestId}/cancel`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Hủy yêu cầu lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getPayoutRequestList = useCallback(
    async (
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
      filters: { field: string; value: unknown }[] = []
    ) => {
      const endpoint = `${PAYOUT_REQUEST_ENDPOINT}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')
      let filtersFormat = {}
      filters.forEach((filter) => {
        filtersFormat = Object.assign({ [filter.field]: filter.value }, filtersFormat)
      })
      const result = await callAppProtectedApi<ListResponseDto<PayoutRequestListItemResponseDto>>(
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

  const getPayoutRequestById = useCallback(
    async (requestId: string) => {
      const endpoint = `${PAYOUT_REQUEST_ENDPOINT}/${requestId}`
      const result = await callAppProtectedApi<PayoutRequestDetailResponseDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết yêu cầu rút tiền') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const cancelPayoutRequest = useCallback(
    async (requestId: string) => {
      const endpoint = `${PAYOUT_REQUEST_ENDPOINT}/${requestId}/cancel`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Hủy yêu cầu rút tiền') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const createPayoutRequest = useCallback(
    async (request: { amount: number; description: string }) => {
      const endpoint = `${PAYOUT_REQUEST_ENDPOINT}`
      const result = await callAppProtectedApi<IdResponseDto>(endpoint, 'POST', {}, {}, request)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Gửi yêu cầu rút tiền') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getPayoutUsage = useCallback(async () => {
    const endpoint = `${PAYOUT_REQUEST_ENDPOINT}/usage`
    const result = await callAppProtectedApi<{ balance: number; usage: number; count: number }>(
      endpoint,
      'GET',
      {},
      {},
      {}
    )

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin yêu cầu') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  return {
    getAvailableTime,
    createPublishClassRequest,
    createCancelClassRequest,
    getClassRequestList,
    getClassRequestById,
    cancelClassRequest,
    getPayoutRequestList,
    getPayoutRequestById,
    cancelPayoutRequest,
    createPayoutRequest,
    getPayoutUsage
  }
}
