import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import styles from './predictedLineups.module.css'

type Props = {
  lineup: PredictedLineupDto
}

export function TeamLineup({ lineup }: Props) {
  const starters = lineup.players.filter(p => p.status === 0)

  return (
    <div className={styles.team}>
      <div className={styles.teamName}>
        {lineup.teamName}
      </div>

      <ul className={styles.players}>
        {starters.map(p => (
          <li key={p.playerSeasonId}>
            <strong>{p.position}</strong> {p.fullName}
          </li>
        ))}
      </ul>
    </div>
  )
}