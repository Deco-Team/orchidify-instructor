import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/firebase/custom-token'

const useAuthFirebaseApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const createCustomToken = useCallback(async () => {
    const result = await callAppProtectedApi<{ token: string }>(ROOT_ENDPOINT, 'POST')

    if (result) {
      const { data, error } = result
      if (data) return { data: data.token, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.ACTION_DID_FAILED('Tải đoạn chat') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  return { createCustomToken }
}

export default useAuthFirebaseApi
