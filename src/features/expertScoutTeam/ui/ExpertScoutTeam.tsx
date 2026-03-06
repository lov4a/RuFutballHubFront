import { useEffect, useState } from 'react'
import styles from './expertScoutTeam.module.css'
import { getExpertScoutTeam } from '../api/getExpertScoutTeam'
import type {
  ExpertScoutTeamResponse,
  Position,
  ExpertPlayer
} from '../model/types'
import { PlayerRow } from './PlayerRow'

type Props = {
  seasonId: string
  tour: number
}

export function ExpertScoutTeam({ seasonId, tour }: Props) {
  const [data, setData] = useState<ExpertScoutTeamResponse | null>(null)

  useEffect(() => {
    getExpertScoutTeam(seasonId, tour).then(setData)
  }, [seasonId, tour])

  if (!data) return <div>Loading...</div>

const starters = data.players.filter(
  (p: ExpertPlayer) => !p.bench
)

const bench = data.players.filter(
  (p: ExpertPlayer) => p.bench
)

const group = (pos: Position) =>
  starters.filter((p: ExpertPlayer) => p.position === pos)

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Команда RFH на {data.tourNumber} тур
      </h3>

      <div className={styles.pitch}>
        <PlayerRow players={group('GOALKEEPER')} />
        <PlayerRow players={group('DEFENDER')} />
        <PlayerRow players={group('MIDFIELDER')} />
        <PlayerRow players={group('FORWARD')} />
      </div>

      <div className={styles.bench}>
        {bench.map((p: ExpertPlayer) => (
          <div key={p.playerSeasonId} className={styles.benchItem}>
            {p.fullName}
          </div>
        ))}
      </div>
    </div>
  )
}