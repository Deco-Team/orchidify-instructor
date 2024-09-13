import { decodeJwt } from 'jose'
import { createContext, ReactNode, useState } from 'react'
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
  login: (email: string, password: string) => Promise<ErrorResponseDto | null>
  logout: () => void
}

const defaultContextValue: IAuthContextValue = {
  userTokenPayload: null,
  login: () => Promise.resolve(null),
  logout: () => {}
}

export const AuthContext = createContext<IAuthContextValue>(defaultContextValue)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const accessToken = localStorage.getItem('accessToken')
  const [jwtPayload, setJwtPayload] = useState<IUserTokenPayload | null>(
    accessToken ? (decodeJwt(accessToken) as IUserTokenPayload) : null
  )

  const login = async (email: string, password: string) => {
    const { response, error } = await callApi('/auth/instructor/login', 'POST', {}, {}, { email, password })
    if (response) {
      const { accessToken, refreshToken } = response.data.data as LoginResponseDto
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      const decoded = decodeJwt(accessToken)
      setJwtPayload(decoded as IUserTokenPayload)
      return null
    } else if (error!.response) {
      return error!.response.data as ErrorResponseDto
    } else {
      return { message: APP_MESSAGE.LOGIN_FAIL } as ErrorResponseDto
    }
  }

  const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) callApi('/auth/instructor/logout', 'POST', {}, {}, { refreshToken })
    if (jwtPayload) setJwtPayload(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return (
    <AuthContext.Provider
      value={{
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
