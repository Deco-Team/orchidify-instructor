import { InstructorDto } from '~/data/profile/instructor.dto'
import { useAuthApi } from './useAuthApi'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'

const ROOT_ENDPOINT = '/instructors/profile'

export const useProfile = () => {
  const { data, error, callAuthApi } = useAuthApi<InstructorDto>()

  const getProfile = useCallback(() => callAuthApi(ROOT_ENDPOINT, 'GET', {}, {}, {}), [])

  if (error) {
    if (error.response) {
      return { data: null, error: error.response.data as ErrorResponseDto, getProfile }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin giảng viên') } as ErrorResponseDto,
      getProfile
    }
  }

  return { data: data, error: null, getProfile }
}
