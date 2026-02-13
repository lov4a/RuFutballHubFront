import { useState } from 'react'
import { login } from '../api/api'
import { useAuth } from '../../../../app/providers/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../../auth.module.css'
import { useGlobalError } from '../../../../app/providers/ErrorProvider'


export function LoginForm() {
  const { login: saveAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as any)?.from?.pathname || '/'

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { showError } = useGlobalError()

  const onSubmit = async () => {
    setLoading(true)

    try {
      const result = await login({ userName, password })
      saveAuth(result.accessToken, result.refreshToken)

      navigate(from, { replace: true })
    } catch (e: any) {
      if (e.response?.status === 401) {
        showError('Неверный логин или пароль | или не подтверждена почта')
      } else {
        showError('Ошибка сервера. попробуйте позже')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Вход в аккаунт</h1>

      <div className={styles.inputBlock}>
        <input
          placeholder="Логин"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Авторизация...' : 'Войти'}
        </button>
      </div>
    </div>
  )
}

