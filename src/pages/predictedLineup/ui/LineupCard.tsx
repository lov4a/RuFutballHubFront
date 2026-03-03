import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import { TeamLineup } from './TeamLineup'
import styles from './predictedLineups.module.css'

type Props = {
  teams: PredictedLineupDto[]
}

export function LineupCard({ teams }: Props) {
  if (teams.length !== 2) return null

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {teams[0].teamName} vs {teams[1].teamName}
      </div>

      <div className={styles.content}>
        <TeamLineup lineup={teams[0]} />
        <TeamLineup lineup={teams[1]} />
      </div>
    </div>
  )
}