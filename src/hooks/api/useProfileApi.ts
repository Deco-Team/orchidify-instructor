import { InstructorDto } from '~/data/profile/instructor.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'

const ROOT_ENDPOINT = '/instructors'

export const useProfileApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getProfile = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/profile`
    const result = await callAppProtectedApi<InstructorDto>(endpoint, 'GET', {}, {}, {})

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin giảng viên') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  return { getProfile }
}
