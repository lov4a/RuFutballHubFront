import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import { TeamLineup } from './TeamLineup'
import styles from './predictedLineups.module.css'

type Props = {
  homeLineup?: PredictedLineupDto
  awayLineup?: PredictedLineupDto
  homeTeamName: string
  awayTeamName: string
  matchDate: string
}


export function LineupCard({
  homeLineup,
  awayLineup,
  homeTeamName,
  awayTeamName,
  matchDate
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.date}>
        {matchDate}
      </div>
      <div className={styles.header}>
        <div style={{textAlign:'center'}}>{homeTeamName}</div>
        <div style={{textAlign:'center'}}>{awayTeamName}</div>
      </div>

      <div className={styles.content}>
        <TeamLineup lineup={homeLineup} />
        <TeamLineup lineup={awayLineup} />
      </div>
    </div>
  )
}