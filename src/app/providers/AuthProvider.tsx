import { createContext, useContext, useEffect, useState } from 'react'
import { decodeJwt } from '../../shared/auth/decodeJwt'
import { logoutRequest } from '../../features/auth/logout/api/logout'
import { clearTokens } from '../../shared/auth/tokens'
import { authEvents } from '../../shared/auth/authEvents'
import { useGlobalError } from './ErrorProvider'
import { UserRole } from '../../shared/auth/roles'

type AuthContextValue = {
  isAuthenticated: boolean
  isInitialized: boolean
  userName: string | null
  roles: UserRole[]
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
}


const AuthContext = createContext<AuthContextValue | null>(null)


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [roles, setRoles] = useState<UserRole[]>([])

  const { showError } = useGlobalError()

const applyToken = (accessToken: string) => {
  const payload = decodeJwt(accessToken)

  setIsAuthenticated(true)

  const userName =
    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ??
    null

  setUserName(userName)

  const roleClaim =
    payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  if (Array.isArray(roleClaim)) {
    setRoles(roleClaim as UserRole[])
  } else if (roleClaim) {
    setRoles([roleClaim as UserRole])
  } else {
    setRoles([])
  }
}


useEffect(() => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    applyToken(token)
  }

  setIsInitialized(true)
}, [])

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    applyToken(accessToken)
  }



const logout = async () => {
  try {
    await logoutRequest()
  } catch {
    // намеренно игнорируем ошибки logout
  } finally {
    clearTokens()
    setIsAuthenticated(false)
    setUserName(null)
    setRoles([])
  }
}

useEffect(() => {
  const onSessionExpired = () => {
    showError('Сессия истекла. Войдите снова')
    logout()
  }

  authEvents.on('session-expired', onSessionExpired)

  return () => {
    authEvents.off('session-expired', onSessionExpired)
  }
}, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        userName,
        roles,
        login,
        logout,
      }}
    >

      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
