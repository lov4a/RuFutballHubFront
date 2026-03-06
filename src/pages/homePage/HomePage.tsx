import styles from './homePage.module.css'
import { HomeNewsSection } from '../../features/news/newsCards/HomeNewsSection'

export function HomePage() {
  return( 
  <div className={styles.mainContainer}>
    <div className={styles.container}>
      <HomeNewsSection/>
    </div>
  </div>
  )
}
