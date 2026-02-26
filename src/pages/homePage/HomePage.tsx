import styles from './homePage.module.css'
import { FixtureTicker } from '../../features/fixtureTicker/ui/FixtureTicker'
import { HomeNewsSection } from '../../features/news/newsCards/HomeNewsSection'

export function HomePage() {
  return( 
  <div className={styles.mainContainer}>
    <div>
      <HomeNewsSection/>
    </div>
    <div>
      <FixtureTicker seasonId="598c15d1-e730-4365-8617-9bd9c24e7553" />
    </div>
  </div>
  )
}
