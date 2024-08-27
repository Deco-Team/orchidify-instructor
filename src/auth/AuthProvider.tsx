import { decodeJwt } from 'jose'
import { createContext, ReactNode, useMemo, useState } from 'react'

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
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const defaultContextValue: IAuthContextValue = {
  accessToken: null,
  refreshToken: null,
  userTokenPayload: null,
  login: () => {},
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

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }

  const logout = () => {
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
