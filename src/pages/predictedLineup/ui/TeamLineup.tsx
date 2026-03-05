import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import styles from './predictedLineups.module.css'

type Props = {
  lineup?: PredictedLineupDto
}

const positionOrder: Record<string, number> = {
  ВРТ: 0,
  ЗАЩ: 1,
  ПЗЩ: 2,
  НАП: 3,
  ПЗ: 4,
  ЦЗ: 5,
  ЛЗ: 6,
  ЦОП: 7,
  ЦП: 8,
  ЦАП: 9,
  ЛП: 10,
  ПП: 11,
  ЛФА: 12,
  ПФА: 13,
  ЦФД: 14,
  ФРВ: 15
}

export function TeamLineup({ lineup }: Props) {
  if (!lineup) {
    return <div className={styles.team}>Нет состава</div>
  }

  const starters = lineup.players
    .filter(p => p.status === "Probable")
    .sort(
      (a, b) =>
        (positionOrder[a.position] ?? 999) -
        (positionOrder[b.position] ?? 999)
    )

  if (starters.length < 11) {
    return (
      <div className={styles.team}>
        Состав команды ещё не готов
      </div>
    )
  }

  return (
    <div className={styles.team}>
      <ul className={styles.players}>
        {starters.map(player => (
          <li key={player.playerSeasonId}>
            <div className={styles.position}>
              <strong>{player.position}</strong>
            </div>
            <div className={styles.name}>{player.fullName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}