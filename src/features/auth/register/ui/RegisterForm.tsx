import { useState } from 'react'
import { register } from '../api/register'
import styles from '../../../auth.module.css'
import { useGlobalError } from '../../../../app/providers/ErrorProvider'

export function RegisterForm() {
  const { showError } = useGlobalError()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const result = await register({
        userName,
        email,
        password,
      })

      console.log('CONFIRM TOKEN (dev):', result.emailConfirmationToken)
      setSuccess(true)
    } catch (e) {
      showError('Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <p>
        Регистрация успешна.  
        Проверь почту (dev: смотри console).
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit}>
        <div className={styles.inputBlock}>
            <input
                placeholder="Логин"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />

            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
        </div>

    </form>
  )
}
