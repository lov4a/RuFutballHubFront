import { api } from '../../../../shared/api/axios'
import { getRefreshToken } from '../../../../shared/auth/tokens'

export async function logoutRequest() {
  const refreshToken = getRefreshToken()

  if (!refreshToken) return

  await api.post('/auth/logout', {
    refreshToken,
  })
}
