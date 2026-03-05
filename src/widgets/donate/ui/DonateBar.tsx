import { useState, useEffect } from 'react'
import styles from './donateBar.module.css'

const HIDE_DAYS = 3
const HIDE_TIME = HIDE_DAYS * 24 * 60 * 60 * 1000

export function DonateBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const closedAt = localStorage.getItem('donateBarClosedAt')

    if (closedAt) {
      const diff = Date.now() - Number(closedAt)

      if (diff < HIDE_TIME) {
        setHidden(true)
      } else {
        localStorage.removeItem('donateBarClosedAt')
      }
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('donateBarClosedAt', Date.now().toString())
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div className={styles.donateBar}>
      <button
        className={styles.close}
        onClick={handleClose}
        aria-label="Закрыть"
      >
        ✕
      </button>

      <div className={styles.text}>
        Поддержать развитие Russian Fantasy HUB можно здесь
      </div>

      <div className={styles.buttons}>
        <a
          href="https://dalink.to/rufantasyhub"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.donate}
        >
          карта
        </a>

        <a href="/donate/crypto" className={styles.crypto}>
          крипта
        </a>
      </div>
    </div>
  )
}