import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { UserRole } from '../../shared/auth/roles'
import { hasRole } from '../../shared/auth/hasRole'

type Props = {
  roles?: UserRole[]
}

export function RequireAuth({ roles }: Props) {
  const {
    isAuthenticated,
    isInitialized,
    roles: userRoles,
  } = useAuth()

  const location = useLocation()

  if (!isInitialized) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  if (roles && !hasRole(userRoles, roles)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
