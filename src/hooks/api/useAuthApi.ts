import { useState } from 'react'
import useAuth from '~/auth/useAuth'
import { RefreshTokenResponseDto } from '~/data/auth.dto'
import { callApi } from '~/utils/apiCaller'
import { AxiosError } from 'axios'

const handleRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponseDto | null> => {
  const { response } = await callApi('/auth/refresh', 'POST', {
    Authorization: `Bearer ${refreshToken}`
  })

  if (response) {
    return response.data.data as RefreshTokenResponseDto
  }

  return null
}

export const useAuthApi = <T>() => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)

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
      setData(apiResponse.data.data as T)
      return
    }

    if (apiError!.response?.status === 401) {
      if (!refreshToken) {
        logout()
        return
      }

      const refreshTokenResponse = await handleRefreshToken(refreshToken)
      if (refreshTokenResponse) {
        localStorage.setItem('accessToken', refreshTokenResponse.accessToken)
        localStorage.setItem('refreshToken', refreshTokenResponse.refreshToken)
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
          setData(newApiResponse.data.data as T)
          return
        }

        setError(newApiError)
        return
      }

      logout()
      return
    }

    setError(apiError)
  }

  return { data, error, callAuthApi }
}
