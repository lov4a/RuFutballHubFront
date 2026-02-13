import { api } from '../../../../shared/api/axios'

export type LoginRequest = {
  userName: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export async function login(dto: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', dto)
  return data
}
