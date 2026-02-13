import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authEvents } from '../../shared/auth/authEvents'

export function AuthNavigationEffect() {
  const navigate = useNavigate()

  useEffect(() => {
    const onSessionExpired = () => {
      navigate('/login', { replace: true })
    }

    authEvents.on('session-expired', onSessionExpired)

    return () => {
      authEvents.off('session-expired', onSessionExpired)
    }
  }, [])

  return null
}
