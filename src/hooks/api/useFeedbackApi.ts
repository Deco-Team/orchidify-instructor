import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ListResponseDto } from '~/data/common.dto'
import { FeedbackDto } from '~/data/feedback/feedback.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'

const ROOT_ENDPOINT = '/feedbacks/instructor'

const useFeedbackApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getCourseFeedbackList = useCallback(
    async (
      courseId: string,
      rate?: number,
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = []
    ) => {
      const endpoint = `${ROOT_ENDPOINT}/courses/${courseId}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')

      const result = await callAppProtectedApi<ListResponseDto<FeedbackDto>>(
        endpoint,
        'GET',
        {},
        {
          rate,
          page,
          limit: pageSize,
          sort: sortingFormat ? sortingFormat : undefined
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('nhận xét khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getClassFeedbackList = useCallback(
    async (classId: string, rate?: number) => {
      const endpoint = `${ROOT_ENDPOINT}/classes/${classId}`

      const result = await callAppProtectedApi<{ docs: FeedbackDto[] }>(
        endpoint,
        'GET',
        {},
        {
          rate
        },
        {}
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('nhận xét lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getCourseFeedbackList,
    getClassFeedbackList
  }
}

export default useFeedbackApi
