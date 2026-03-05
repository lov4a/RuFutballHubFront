import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>RFH</h3>
          <p>Портал по Fantasy РПЛ</p>
          <a href="donate/crypto">Поддержать проект</a>
        </div>

        <div className={styles.center}>
          <a href="expected-points">Ожидаемые очки</a>
          <a href="fixtures-ticker">Календарь</a>
          <a href="predicted-lineups">Ожидаемые составы</a>
          <a href="news">Новости</a>
        </div>

        <div className={styles.right}>
          <p>© {new Date().getFullYear()} RFH</p>
          <p>Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}