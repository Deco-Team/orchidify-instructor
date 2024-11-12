import { InstructorCertificationDto, InstructorDto } from '~/data/profile/instructor.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { SuccessResponseDto } from '~/data/common.dto'

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
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('trang cá nhân') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const putProfile = useCallback(
    async (instructor: InstructorDto) => {
      const endpoint = `${ROOT_ENDPOINT}/profile`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PUT', {}, {}, instructor)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Cập nhật trang cá nhân') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getInstructorCertifications = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/certifications`
    const result = await callAppProtectedApi<{ docs: InstructorCertificationDto[] }>(endpoint, 'GET', {}, {}, {})

    if (result) {
      const { data, error } = result
      if (data) return { data: data.docs, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chứng chỉ') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  return { getProfile, putProfile, getInstructorCertifications }
}
