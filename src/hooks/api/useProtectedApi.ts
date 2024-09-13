import { useCallback } from 'react'
import { TokenError } from '~/data/error.dto'
import { AxiosError } from 'axios'
import useAuth from '~/auth/useAuth'
import { appProtectedApi } from '~/utils/appProtectedApiCaller'

export const useProtectedApi = () => {
  const { logout } = useAuth()

  const callAppProtectedApi = useCallback(
    async <T>(
      endpoint: string,
      method: string,
      headers: object = {},
      params: object = {},
      body: object = {}
    ): Promise<{ data: T; error: null } | { data: null; error: AxiosError } | null> => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        logout()
        return null
      }

      try {
        const response = await appProtectedApi({
          url: endpoint,
          method: method,
          headers: Object.assign(
            {
              Authorization: `Bearer ${accessToken}`
            },
            headers
          ),
          params: params,
          data: body
        })

        return { data: response.data.data as T, error: null }
      } catch (err) {
        if (err instanceof TokenError) {
          logout()
          return null
        }

        const error = err as AxiosError

        console.error(`API ERROR: ${error.message}`)

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request)
        }

        return { data: null, error }
      }
    },
    [logout]
  )

  return { callAppProtectedApi }
}
