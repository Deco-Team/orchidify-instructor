import { useCallback } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'
import { ClassListItemResponseDto, ClassDetailResponseDto } from '~/data/class/class.dto'
import { SessionDto } from '~/data/course/course.dto'

const ROOT_ENDPOINT = '/classes/instructor'

export const useClassApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getClassList = useCallback(
    async (
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
      filters: { field: string; value: unknown }[] = []
    ) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')
      let filtersFormat = {}
      filters.forEach((filter) => {
        filtersFormat = Object.assign({ [filter.field]: filter.value }, filtersFormat)
      })
      const result = await callAppProtectedApi<ListResponseDto<ClassListItemResponseDto>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getClassById = useCallback(
    async (classId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}`
      const result = await callAppProtectedApi<ClassDetailResponseDto>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getSessionById = useCallback(
    async (classId: string, sessionId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/sessions/${sessionId}`
      const result = await callAppProtectedApi<SessionDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết buổi học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getClassList, getClassById, getSessionById }
}
