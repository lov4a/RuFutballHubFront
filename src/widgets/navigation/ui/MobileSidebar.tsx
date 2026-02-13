import { Link } from 'react-router-dom'
import { NAV_ITEMS } from './Navigation'
import styles from '../navigation.module.css'

type MobileSidebarProps = {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  if (!open) return null

  return (
    <div className={styles.sidebarOverlay} onClick={onClose}>
      <aside className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </aside>
    </div>
  )
}
