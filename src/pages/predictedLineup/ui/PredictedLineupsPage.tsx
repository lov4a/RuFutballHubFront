import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLineups } from '../../../features/predictedLineup/api/api'
import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import { LineupCard } from './LineupCard.tsx'
import styles from './predictedLineups.module.css'

export function PredictedLineupsPage() {
  const { seasonId, tourNumber } = useParams()
  const [lineups, setLineups] = useState<PredictedLineupDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!seasonId || !tourNumber) return

    getLineups(seasonId, Number(tourNumber))
      .then(setLineups)
      .finally(() => setLoading(false))
  }, [seasonId, tourNumber])

  if (loading) return <div>Загрузка...</div>

  // группируем по 2 команды (матч)
  const matches = []
  for (let i = 0; i < lineups.length; i += 2) {
    matches.push(lineups.slice(i, i + 2))
  }

  return (
    <div className={styles.grid}>
      {matches.map((pair, index) => (
        <LineupCard key={index} teams={pair} />
      ))}
    </div>
  )
}