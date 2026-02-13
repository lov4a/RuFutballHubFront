import { useAuth } from '../../../app/providers/AuthProvider'

export function ProfilePage() {
  const { userName, roles, isAuthenticated } = useAuth()

  return (
    <div>
      <h1>Профиль</h1>

      <p>
        <strong>Авторизован:</strong>{' '}
        {isAuthenticated ? 'Да' : 'Нет'}
      </p>

      <p>
        <strong>Имя пользователя:</strong>{' '}
        {userName ?? '—'}
      </p>

      <p>
        <strong>Роли:</strong>{' '}
        {roles.length > 0 ? roles.join(', ') : '—'}
      </p>
    </div>
  )
}
