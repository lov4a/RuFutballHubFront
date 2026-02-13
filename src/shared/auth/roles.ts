export const UserRole = {
  User: 'User',
  Admin: 'Admin',
  Editor: 'Editor',
  Subscriber: 'Subscriber'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]