import styles from './features.module.css'
import { FixtureTicker } from '../../../features/fixtureTicker/ui/FixtureTicker'
import { ExpertScoutTeam } from '../../../features/expertScoutTeam/ui/ExpertScoutTeam'
import { getCurrentTour } from '../../../features/helpers/api/getCurrentTour'

const SEASON_ID = import.meta.env.VITE_SEASON_ID as string
const tour = await getCurrentTour(SEASON_ID)
export function FeaturesBar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <ExpertScoutTeam
          seasonId = {SEASON_ID}
          tour={tour}
        />
      </div>
      <div className={styles.container}>
        <FixtureTicker seasonId= {SEASON_ID} />
      </div>
    </div>
  )
}
