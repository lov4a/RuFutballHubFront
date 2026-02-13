import { Link } from 'react-router-dom'
import { useAuth } from '../../../app/providers/AuthProvider'
import styles from '../navigation.module.css'

export function TopBar() {
  const { isAuthenticated, userName, logout } = useAuth()
  return (
    <div className={styles.topBar}>
      <div className={styles.topLeft}>
        <a href="#">X</a>
        <a href="#">IG</a>
      </div>

 <div className={styles.topRight}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className={styles.signIn}>
              Sign in
            </Link>
            <Link to="/register" className={styles.join}>
              Join
            </Link>
          </>
        ) : (
          <>
            
              <Link to="/profile" className={styles.signIn}>
                {userName}
              </Link>
            <button onClick={logout} className={styles.signIn}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
