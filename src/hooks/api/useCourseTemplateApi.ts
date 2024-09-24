import { useCallback } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { useProtectedApi } from './useProtectedApi'
import { CourseTemplateListItemResponseDto } from '~/data/course-template/course-template.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/course-templates/instructor'

export const useCourseTemplateApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getCourseTemplateList = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<CourseTemplateListItemResponseDto>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách mẫu khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getCourseTemplateList }
}