import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ListResponseDto, SuccessResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { CourseComboDetailResponseDto, CourseComboListItemResponseDto } from '~/data/course-combo/courseCombo'

const ROOT_ENDPOINT = '/courses/instructor/combo'

export const useCourseComboApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getCourseComboList = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<CourseComboListItemResponseDto>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách combo khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getCourseComboById = useCallback(
    async (courseComboId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${courseComboId}`
      const result = await callAppProtectedApi<CourseComboDetailResponseDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin combo khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const deleteCourseCombo = useCallback(
    async (comboId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${comboId}`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'DELETE')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Xóa Combo khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getCourseComboList, getCourseComboById, deleteCourseCombo }
}
