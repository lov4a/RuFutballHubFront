import { useEffect, useState } from "react"
import styles from "./cookieBanner.module.css"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted")
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookieAccepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <p>
        Мы используем cookies и сервис аналитики Яндекс Метрика для анализа
        трафика и улучшения работы сайта. Продолжая пользоваться сайтом,
        вы соглашаетесь с использованием cookies.
      </p>

      <div className={styles.actions}>
        <a href="/privacy">Политика конфиденциальности</a>
        <button onClick={accept}>Принять</button>
      </div>
    </div>
  )
}