import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from './jwt'

export function decodeJwt(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token)
}
