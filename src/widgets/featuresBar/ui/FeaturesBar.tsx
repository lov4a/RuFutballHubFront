import styles from './features.module.css'
import { FixtureTicker } from '../../../features/fixtureTicker/ui/FixtureTicker'
import { ExpertScoutTeam } from '../../../features/expertScoutTeam/ui/ExpertScoutTeam'

export function FeaturesBar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <ExpertScoutTeam
          seasonId="598c15d1-e730-4365-8617-9bd9c24e7553"
          tour={19}
        />
      </div>
      <div className={styles.container}>
        <FixtureTicker seasonId="598c15d1-e730-4365-8617-9bd9c24e7553" />
      </div>
    </div>
  )
}
