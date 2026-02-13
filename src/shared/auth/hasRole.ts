import { UserRole } from './roles'

export function hasRole(
  userRoles: UserRole[],
  required: UserRole | UserRole[],
) {
  if (Array.isArray(required)) {
    return required.some((r) => userRoles.includes(r))
  }

  return userRoles.includes(required)
}
