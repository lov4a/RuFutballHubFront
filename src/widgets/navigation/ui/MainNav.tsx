import { Link } from 'react-router-dom'
import { NAV_ITEMS } from './Navigation'
import styles from '../navigation.module.css'

type MainNavProps = {
  onMenuClick: () => void
}

export function MainNav({ onMenuClick }: MainNavProps) {
  return (
    <div className={styles.mainNav}>
      <button className={styles.burger} onClick={onMenuClick}>
        ☰
      </button>

      <div className={styles.logo}>RFH</div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
