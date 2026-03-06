import styles from './expertScoutTeam.module.css'
import type { ExpertPlayer } from '../model/types'
import { PlayerCard } from './PlayerCard'

type Props = {
  players: ExpertPlayer[]
}

export function PlayerRow({ players }: Props) {
  return (
    <div className={styles.row}>
      {players.map((p) => (
        <PlayerCard key={p.playerSeasonId} player={p} />
      ))}
    </div>
  )
}