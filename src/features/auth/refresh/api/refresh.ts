import { api } from '../../../../shared/api/axios'

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

export async function refreshTokenRequest(refreshToken: string) {
  const response = await api.post<RefreshResponse>('/auth/refresh', {
    refreshToken,
  })

  return response.data
}
