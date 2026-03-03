import styles from './expertScoutTeam.module.css'
import type { ExpertPlayer } from '../model/types'

type Props = {
  player: ExpertPlayer
}

const teamColors: Record<string, string> = {
  'ЦСКА': '#d50032',
  'Краснодар': '#006633',
  'Зенит': '#00a3e0',
  'Динамо': '#0057b8',
  'Динамо Махачкала': '#1f4fa3',
  'Локомотив': '#d71920',
  'Рубин': '#6b1e1e',
  'Пари НН': '#002b5c',
  'Балтика': '#1c75bc',
}

export function PlayerCard({ player }: Props) {
  const color = teamColors[player.teamName] ?? '#444'

  return (
    <div className={styles.player}>
      <div
        className={styles.avatar}
        style={{ backgroundColor: color }}
      />
      <div className={styles.name}>{player.fullName}</div>
      <div className={styles.team}>{player.teamName}</div>
    </div>
  )
}