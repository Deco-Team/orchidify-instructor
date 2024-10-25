import { useCallback } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'

const ROOT_ENDPOINT = 'learners/instructor'

export const useLearnerApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getLearnerById = useCallback(
    async (learnerId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${learnerId}`
      const result = await callAppProtectedApi<LearnerDetailResponseDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin học viên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getLearnerById }
}
