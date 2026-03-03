import {useGetExpectedPointsCase} from "../../entities/predictedPoints/request";
import {LAST_TOUR, TWO} from "../../shared/const";
import {useState} from "react";
import styles from './index.module.css'
import {useGetCurrentTourNumberCase} from "../../entities/helper/request";

const PredictedPointsPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data: dataCurrentTourNumber } = useGetCurrentTourNumberCase()
    const { data: dataExpectedPoints } = useGetExpectedPointsCase(currentPage, dataCurrentTourNumber)

    const titleTour = [];
    for (let i = dataCurrentTourNumber; i <= LAST_TOUR; i++) {
        titleTour.push(<th className={`${styles.stickyCol} ${styles.colTour}`} key={i as number}>Тур {i}</th>);
    }

    const handleNextPage = (): void => {
        (currentPage === LAST_TOUR) ? setCurrentPage(LAST_TOUR) : setCurrentPage(currentPage + 1)
    }
    const handlePrevPage = (): void => {
        (currentPage === 1) ? setCurrentPage(1) : setCurrentPage(currentPage - 1)
    }

    return (
        <>
            <h1>Ожидаемые очки</h1>

            <div className={styles.tableContainer }>
                <div className={styles.tableWrapper}>
                    <table className={styles.stickyTable}>
                        <thead>
                        <tr>
                            <th className={`${styles.stickyCol} ${styles.colId}`}>№</th>
                            <th className={`${styles.stickyCol} ${styles.colName}`}>Игрок</th>
                            {titleTour}
                        </tr>
                        </thead>

                        <tbody>
                        {dataExpectedPoints?.items?.map((item, index) => (
                            <tr key={item.fullName}>
                                <td className={`${styles.stickyCol} ${styles.colId}`}>
                                    {index + ((dataExpectedPoints?.pageNumber - 1) * dataExpectedPoints?.pageSize) + 1}
                                </td>
                                <td className={`${styles.stickyCol} ${styles.colName}`}>{item.fullName}</td>

                                {item.tours.map((tour, tIdx) => (
                                    <td className={`${styles.stickyCol} ${styles.colTour}`} key={tIdx} title={tour.isHome ? "Д" : "Г"}>
                                        {(tour.expectedPoints).toFixed(TWO)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
                <div className={styles.pagination}>
                    <button onClick={handlePrevPage}>&lt;</button>
                    <button onClick={handleNextPage}>&gt;</button>
                </div>
            </div>


        </>

    )
}

export default PredictedPointsPage