import { useEffect, useRef, useState } from 'react'
import { getFixtureTicker } from '../api/getFixtureTicker'
import { getCurrentTour } from '../../helpers/api/getCurrentTour'
import type { TeamTicker } from '../api/getFixtureTicker'
import styles from './fixtureTicker.module.css'

type Props = {
  seasonId: string
  initialFrom?: number
  initialTo?: number
  fullWidth?: boolean
}

export function FixtureTicker({
  seasonId,
  initialFrom,
  initialTo,
  fullWidth = false,
}: Props) {
  const [data, setData] = useState<TeamTicker[]>([])
  const [currentTour, setCurrentTour] = useState<number | null>(null)
  const [fromTour, setFromTour] = useState<number>(1)
  const [toTour, setToTour] = useState<number>(5)
  const [loading, setLoading] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  // 🔥 Инициализация
  useEffect(() => {
    async function init() {
      const tour = await getCurrentTour(seasonId)
      setCurrentTour(tour)

      if (fullWidth) {
        // Большой календарь — весь сезон
        setFromTour(1)
        setToTour(30)
      } else if (initialFrom && initialTo) {
        // Если передали явно диапазон
        setFromTour(initialFrom)
        setToTour(initialTo)
      } else {
        // Мини календарь — от текущего тура
        setFromTour(tour)
        setToTour(tour + 4)
      }
    }

    init()
  }, [seasonId, fullWidth, initialFrom, initialTo])

  // 🔥 Загрузка данных
  useEffect(() => {
    if (!currentTour) return

    async function load() {
      try {
        setLoading(true)
        const result = await getFixtureTicker(
          seasonId,
          fromTour,
          toTour
        )
        setData(result)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [seasonId, fromTour, toTour, currentTour])

  // 🔥 Автоскролл для большого календаря
  useEffect(() => {
    if (!fullWidth || !currentTour || !scrollRef.current) return

    const cellWidth = 60
    const offset = (currentTour - 1) * cellWidth

    scrollRef.current.scrollTo({
      left: offset - 200,
      behavior: 'smooth',
    })
  }, [data, currentTour, fullWidth])

  const difficultyClass = (level: number) =>
    styles[`difficulty${level}`]

  const handlePrev = () => {
    if (fromTour <= 1) return
    setFromTour(prev => prev - 1)
    setToTour(prev => prev - 1)
  }

  const handleNext = () => {
    if (toTour >= 30) return
    setFromTour(prev => prev + 1)
    setToTour(prev => prev + 1)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div
      className={`${styles.wrapper} ${
        fullWidth ? styles.fullWidth : ''
      }`}
    >
      <div className={styles.scrollContainer} ref={scrollRef}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.teamHeader}>КОМ</th>

              {Array.from(
                { length: toTour - fromTour + 1 },
                (_, i) => fromTour + i
              ).map(tour => (
                <th
                  key={tour}
                  className={`${styles.tourHeader} ${
                    tour === currentTour
                      ? styles.currentTour
                      : ''
                  }`}
                >
                  {tour}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(team => (
              <tr key={team.teamSeasonId}>
                <td className={styles.teamCell}>
                  {team.teamName}
                </td>

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
                    title={f.isHome ? 'Д' : 'Г'}
                  >
                    {f.opponentShortName}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Кнопки только для компактного режима */}
      {!fullWidth && (
        <div className={styles.controls}>
          <button onClick={handlePrev}>&#60;</button>
          <button onClick={handleNext}>&#62;</button>
        </div>
      )}
    </div>
  )
}