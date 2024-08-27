import { ErrorResponseDto } from '~/data/error.dto'
import useAuth from '~/auth/useAuth'
import { RefreshTokenResponseDto } from '~/data/auth.dto'
import { callApi } from '~/utils/apiCaller'
import { notifyError } from '~/utils/toastify'

const handleRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponseDto | null> => {
  const { response } = await callApi('/auth/refresh', 'POST', {}, {}, { refreshToken })
  if (response) {
    return response.data.data as RefreshTokenResponseDto
  }

  return null
}

export const useAuthApi = <T>() => {
  let data: T | null = null
  let error: ErrorResponseDto | null = null

  const { accessToken, refreshToken, logout } = useAuth()

  const callAuthApi = async (
    endpoint: string,
    method: string,
    headers: object = {},
    params: object = {},
    body: object = {}
  ) => {
    if (!accessToken) {
      logout()
      return
    }

    const { response: apiResponse, error: apiError } = await callApi(
      endpoint,
      method,
      Object.assign(
        {
          Authorization: `Bearer ${accessToken}`
        },
        headers
      ),
      params,
      body
    )

    if (apiResponse) {
      data = apiResponse.data.data as T
    }

    if (apiError!.response?.status === 401) {
      if (!refreshToken) {
        logout()
        return
      }

      const refreshTokenResponse = await handleRefreshToken(refreshToken)
      if (refreshTokenResponse) {
        const { response: newApiResponse, error: newApiError } = await callApi(
          endpoint,
          method,
          Object.assign(
            {
              Authorization: `Bearer ${refreshTokenResponse.accessToken}`
            },
            headers
          ),
          params,
          body
        )

        if (newApiResponse) {
          data = newApiResponse.data.data as T
        }

        if (newApiError!.response) {
          error = newApiError!.response.data as ErrorResponseDto
        }

        notifyError('An error occurred while processing your request. Please try again later.')

        return
      }

      logout()
      return
    }

    if (apiError!.response) {
      error = apiError!.response.data as ErrorResponseDto
    }

    notifyError('An error occurred while processing your request. Please try again later.')
  }

  return { data, error, callAuthApi }
}
