import styles from './index.module.css'
import { PredictedPointsBlockPresenter } from './presenter'

const PredictedPointsBlock = () => {
  const { leftHeaders, players, tours, loading, handlePrevPage, handleNextPage } =
    PredictedPointsBlockPresenter()

  const difficultyClass = (points: number) => {
    const level = Math.min(10, Math.max(1, Math.ceil(points)))
    return styles[`difficulty${level}`]
  }

  return (
    <div>
      <div className={styles.tableWrapper}>
        <div className={styles.leftColumn}>
          <table>
            <thead>
              <tr>
                {leftHeaders.map((h, i) => (
                  <th key={i} className={styles.teamHeader}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 15 }).map((_, i) => (
                    <tr key={i}>
                      {leftHeaders.map((_, j) => (
                        <td key={j} className={styles.teamCell}>
                          <div className={styles.skeleton} />
                        </td>
                      ))}
                    </tr>
                  ))
                : players.map((p) => (
                    <tr key={p.id}>
                      {leftHeaders.length === 2 && <td className={styles.teamCell}>{p.id}</td>}

                      <td className={styles.teamCell}>{p.name}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT TABLE */}
        <div className={styles.rightScroll}>
          <table>
            <thead>
              <tr>
                {tours.map((tour) => (
                  <th key={tour}>{tour}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 15 }).map((_, row) => (
                    <tr key={row}>
                      {tours.map((_, col) => (
                        <td key={col} className={styles.fixture}>
                          <div className={styles.skeleton} />
                        </td>
                      ))}
                    </tr>
                  ))
                : players.map((p) => (
                    <tr key={p.id}>
                      {p.tours.map((tour, i) => (
                        <td
                          key={i}
                          className={[styles.fixture, difficultyClass(tour.expectedPoints)].join(
                            ' ',
                          )}
                        >
                          <span title={tour.isHome ? 'Д' : 'Г'}>
                            {tour.expectedPoints.toFixed(2)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handlePrevPage}>{'<'}</button>
        <button onClick={handleNextPage}>{'>'}</button>
      </div>
    </div>
  )
}

export default PredictedPointsBlock
