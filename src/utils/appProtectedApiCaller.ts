import axios, { AxiosError } from 'axios'
import { RefreshTokenResponseDto } from '~/data/auth.dto'
import { TokenError } from '~/data/error.dto'

const accessTokenHistory = {
  current: localStorage.getItem('accessToken'),
  last: null as string | null
}

let refreshTokenResponse: Promise<RefreshTokenResponseDto> | undefined = undefined
const isUnauthorizedError = (error: AxiosError) => {
  return error.response?.status === 401
}

const handleRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')

  if (!refreshToken) throw new Error('refresh token does not exist')

  try {
    const response = await axios(import.meta.env.VITE_API_URL + '/auth/management/refresh', {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` }
    })
    return response.data.data as RefreshTokenResponseDto
  } catch {
    return Promise.reject(new TokenError())
  }
}

export const appProtectedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

appProtectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = (error as AxiosError).config

    if (!isUnauthorizedError(error) || !originalConfig) return Promise.reject(error)

    const accessToken = (originalConfig.headers.Authorization as string).split(' ')[1]

    try {
      if (accessToken === accessTokenHistory.current) {
        if (!refreshTokenResponse) refreshTokenResponse = handleRefreshToken()

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokenResponse

        accessTokenHistory.last = accessTokenHistory.current
        accessTokenHistory.current = newAccessToken
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
      }

      originalConfig.headers.Authorization = `Bearer ${accessTokenHistory.current}`

      try {
        return await axios(originalConfig)
      } catch (retryError) {
        if (isUnauthorizedError(retryError as AxiosError)) return Promise.reject(new TokenError())

        return Promise.reject(retryError)
      }
    } catch (refreshTokenError) {
      return Promise.reject(refreshTokenError as TokenError)
    } finally {
      refreshTokenResponse = undefined
    }
  }
)
