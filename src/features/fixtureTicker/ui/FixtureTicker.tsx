import { useEffect, useRef, useState } from 'react'
import { getFixtureTicker } from '../api/getFixtureTicker'
import { getCurrentTour } from '../../helpers/api/getCurrentTour'
import type { TeamTicker } from '../api/getFixtureTicker'
import styles from './fixtureTicker.module.css'

type Props = {
  seasonId: string
  fullWidth?: boolean
}

export function FixtureTicker({
  seasonId,
  fullWidth = false,
}: Props) {
  const [data, setData] = useState<TeamTicker[]>([])
  const [currentTour, setCurrentTour] = useState<number | null>(null)
  const [visibleTour, setVisibleTour] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  // 🔥 Загрузка текущего тура и всех данных (1 раз)
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)

        const tour = await getCurrentTour(seasonId)
        setCurrentTour(tour)
        setVisibleTour(tour)

        const result = await getFixtureTicker(
          seasonId,
          1,
          30
        )

        setData(result)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [seasonId])

  // 🔥 Скролл к туру
  const scrollToTour = (tour: number) => {
    if (!scrollRef.current) return

    const cellWidth = 60 // соответствует ширине ячейки
    const offset = (tour - 1) * cellWidth

    scrollRef.current.scrollTo({
      left: offset - 120,
      behavior: 'smooth',
    })
  }

  // 🔥 Автоскролл при первой загрузке
  useEffect(() => {
    if (!currentTour) return
    scrollToTour(currentTour)
  }, [data, currentTour])

  const difficultyClass = (level: number) =>
    styles[`difficulty${level}`]

  // 🔥 Кнопки мини-виджета (только скроллят)
  const handlePrev = () => {
    if (!visibleTour || visibleTour <= 1) return
    const newTour = visibleTour - 1
    setVisibleTour(newTour)
    scrollToTour(newTour)
  }

  const handleNext = () => {
    if (!visibleTour || visibleTour >= 30) return
    const newTour = visibleTour + 1
    setVisibleTour(newTour)
    scrollToTour(newTour)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div
      className={`${styles.wrapper} ${
        fullWidth ? styles.fullWidth : ''
      }`}
    >
      {!fullWidth && <h3>RFH Календарь</h3>}

      <div className={styles.tableWrapper}>
        {/* Левая фиксированная колонка */}
        <div className={styles.leftColumn}>
          <table>
            <thead>
              <tr>
                <th className={styles.teamHeader}>КОМ</th>
              </tr>
            </thead>
            <tbody>
              {data.map(team => (
                <tr key={team.teamSeasonId}>
                  <td className={styles.teamCell}>
                    {team.teamName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Правая скроллируемая часть */}
        <div
          className={styles.rightScroll}
          ref={scrollRef}
        >
          <table>
            <thead>
              <tr>
                {Array.from({ length: 30 }, (_, i) => i + 1).map(
                  tour => (
                    <th
                      key={tour}
                      className={
                        tour === currentTour
                          ? styles.currentTour
                          : ''
                      }
                    >
                      {tour}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.map(team => (
                <tr key={team.teamSeasonId}>
                  {team.fixtures.map(f => (
                    <td
                      key={f.tourNumber}
                      className={`${styles.fixture}
                        ${difficultyClass(
                          f.difficultyLevel
                        )}
                        ${
                          f.tourNumber === currentTour
                            ? styles.currentTour
                            : ''
                        }
                      `}
                    >
                      {f.opponentShortName}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Кнопки только в компактном режиме */}
      {!fullWidth && (
        <div className={styles.controls}>
          <button onClick={handlePrev}>
            &#60;
          </button>
          <button onClick={handleNext}>
            &#62;
          </button>
        </div>
      )}
    </div>
  )
}