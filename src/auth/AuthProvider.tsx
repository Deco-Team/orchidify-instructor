import { decodeJwt } from 'jose'
import { createContext, ReactNode, useMemo, useState } from 'react'
import { LoginResponseDto } from '~/data/auth.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { callApi } from '~/utils/apiCaller'

interface IUserTokenPayload {
  name?: string
  sub?: string
  role?: string
  iat?: number
  exp?: number
}

interface IAuthContextValue {
  userTokenPayload: IUserTokenPayload | null
  accessToken: string | null
  refreshToken: string | null
  login: (email: string, password: string) => Promise<ErrorResponseDto | null>
  logout: () => void
}

const defaultContextValue: IAuthContextValue = {
  accessToken: null,
  refreshToken: null,
  userTokenPayload: null,
  login: () => Promise.resolve(null),
  logout: () => {}
}

export const AuthContext = createContext<IAuthContextValue>(defaultContextValue)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'))
  const jwtPayload = useMemo(() => {
    if (accessToken) return decodeJwt(accessToken)
    return null
  }, [accessToken])

  const login = async (email: string, password: string) => {
    const { response, error } = await callApi('/auth/instructor/login', 'POST', {}, {}, { email, password })
    if (response) {
      const { accessToken, refreshToken } = response.data.data as LoginResponseDto
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      return null
    } else if (error!.response) {
      return error!.response.data as ErrorResponseDto
    } else {
      return { message: APP_MESSAGE.LOGIN_FAIL } as ErrorResponseDto
    }
  }

  const logout = () => {
    callApi('/auth/instructor/logout', 'POST', {}, {}, { refreshToken })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setAccessToken(null)
    setRefreshToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userTokenPayload: jwtPayload
          ? {
              name: jwtPayload.name as string | undefined,
              role: jwtPayload.role as string | undefined,
              sub: jwtPayload.sub,
              iat: jwtPayload.iat,
              exp: jwtPayload.exp
            }
          : null,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
