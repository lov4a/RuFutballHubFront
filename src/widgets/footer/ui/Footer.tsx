import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>RFH</h3>
          <p>Fantasy портал по РПЛ</p>
        </div>

        <div className={styles.center}>
          <a href="fixtures-ticker">Календарь</a>
          <a href="#">Ожидаемые очки</a>
          <a href="#">Новости</a>
        </div>

        <div className={styles.right}>
          <p>© {new Date().getFullYear()} RFH</p>
          <p>Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}