import { api } from '../../../../shared/api/axios'
import type { RegisterRequest, RegisterResponse } from '../model/types'

export async function register(data: RegisterRequest) {
  const response = await api.post<RegisterResponse>(
    '/auth/register',
    data,
  )

  return response.data
}
