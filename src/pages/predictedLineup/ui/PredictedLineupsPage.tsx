import { useEffect, useState } from 'react'
import { getLineups } from '../../../features/predictedLineup/api/api'
import { getCurrentTour } from '../../../features/helpers/api/getCurrentTour'
import { getTourMatches } from '../../../features/helpers/api/getTourMatches'
import type { PredictedLineupDto } from '../../../features/predictedLineup/model/types'
import type { MatchDto } from '../../../features/helpers/api/getTourMatches'
import { LineupCard } from './LineupCard'
import styles from './predictedLineups.module.css'
import { formatMatchDate } from '../../../shared/lib/formatDate'

const SEASON_ID = import.meta.env.VITE_SEASON_ID as string

export function PredictedLineupsPage() {
  const [matches, setMatches] = useState<
    {
      match: MatchDto
      homeLineup?: PredictedLineupDto
      awayLineup?: PredictedLineupDto
    }[]
  >([])

  const [tourNumber, setTourNumber] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        const currentTour = await getCurrentTour(SEASON_ID)
        setTourNumber(currentTour)

        const [tourMatches, lineups] = await Promise.all([
          getTourMatches(SEASON_ID, currentTour),
          getLineups(SEASON_ID, currentTour)
        ])

        const mapped = tourMatches.map(match => ({
          match,
          homeLineup: lineups.find(
            l => l.teamSeasonId === match.homeTeamSeasonId
          ),
          awayLineup: lineups.find(
            l => l.teamSeasonId === match.awayTeamSeasonId
          )
        }))

        setMatches(mapped)
      } catch (e) {
        console.error('Ошибка загрузки:', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <div>Загрузка...</div>
  if (!tourNumber) return <div>Нет данных</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Прогнозируемые составы на {tourNumber} тур
      </h2>

      <div className={styles.grid}>
        {matches.map(({ match, homeLineup, awayLineup }) => (
          <LineupCard
            key={match.id}
            homeLineup={homeLineup}
            awayLineup={awayLineup}
            homeTeamName={match.homeTeamName}
            awayTeamName={match.awayTeamName}
            matchDate={formatMatchDate(match.kickOffTime)}
          />
        ))}
      </div>
    </div>
  )
}