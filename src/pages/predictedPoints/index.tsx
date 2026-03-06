import {useGetExpectedPointsCase} from "../../entities/predictedPoints/request";
import {LAST_TOUR, SEASON_ID, TWO} from "../../shared/const";
import {useState} from "react";
import styles from './index.module.css'
import {useGetCurrentTourNumberCase} from "../../entities/helper/request";
import {StickyDualTable} from "../../widgets/table";
import {useIsMobile} from "../../shared/utils/sizeWindows";

const PredictedPointsPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(SEASON_ID)
    const { data: dataCurrentTourNumber } = useGetCurrentTourNumberCase()
    const { data: dataExpectedPoints } = useGetExpectedPointsCase(currentPage, dataCurrentTourNumber)

    const isMobile = useIsMobile();

    const leftHeaders = isMobile ? ["Игрок"] : ["№", "Игрок"];

    const leftRows = dataExpectedPoints?.items?.map((item, index) =>
        isMobile
            ? [item.fullName]
            : [
                index + ((dataExpectedPoints?.pageNumber - 1) * 15) + 1,
                item.fullName
            ]
    );

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

    const difficultyClass = (points: number) => {
        const level = Math.min(10, Math.max(1, Math.ceil(points)));
        return styles[`difficulty${level}`];
    };

    const handleGetCellClass=(row, col, cell) => {
        return difficultyClass(cell.data.expectedPoints)
    }

    return (
        <>
            <h1>Ожидаемые очки</h1>

        {/*    <StickyDualTable*/}
        {/*        leftHeaders={leftHeaders}*/}

        {/*        leftRows={leftRows}*/}

        {/*        rightHeaders={Array.from(*/}
        {/*            { length: LAST_TOUR - dataCurrentTourNumber + 1 },*/}
        {/*            (_, i) => `${dataCurrentTourNumber + i}`*/}
        {/*        )}*/}

        {/*        rightRows={dataExpectedPoints?.items?.map(item =>*/}
        {/*                item.tours.map(tour => ({*/}
        {/*                    component: (*/}
        {/*                        <span title={tour.isHome ? "Д" : "Г"}>*/}
        {/*  {tour.expectedPoints.toFixed(TWO)}*/}
        {/*</span>*/}
        {/*                    ),*/}
        {/*                    data: tour*/}
        {/*                }))*/}
        {/*        )}*/}

                {/*getCellClass={(row, col, cell) => {*/}
                {/*   return difficultyClass(cell.data.expectedPoints)*/}
                {/*}}*/}


        {/*        currentColumnIndex={0}*/}
        {/*        fullWidth*/}
        {/*        onPrev={handlePrevPage}*/}
        {/*        onNext={handleNextPage}*/}
        {/*    />*/}
            <div>
                <div className={styles.tableWrapper}>

                    {/* Левая фиксированная колонка */}
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
                            {leftRows?.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    {row.map((cell, colIdx) => (
                                        <td key={colIdx} className={styles.teamCell}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Правая часть */}
                    <div className={styles.rightScroll}>
                        <table>
                            <thead>
                            <tr>
                                {Array.from({ length: LAST_TOUR - dataCurrentTourNumber + 1 },
                                (_, i) => `${dataCurrentTourNumber + i}`).map((h, i) => (
                                    <th
                                        key={i}
                                        className={
                                            i === 0 ? styles.currentTour : ""
                                        }
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>

                            <tbody>
                            {dataExpectedPoints?.items?.map(item =>
                                    item.tours.map(tour => ({
                                        component: (
                                            <span title={tour.isHome ? "Д" : "Г"}>
          {tour.expectedPoints.toFixed(TWO)}
        </span>
                                        ),
                                        data: tour
                                    }))
                            )?.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    {row?.map((cell, colIdx) => {
                                        const userClass = handleGetCellClass?.(rowIdx, colIdx, cell) || "";

                                        return (
                                            <td
                                                key={colIdx}
                                                className={[
                                                    styles.fixture,
                                                    userClass,
                                                    colIdx === 0 ? styles.currentTour : ""
                                                ].join(" ")}
                                            >
                                                {cell?.component}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Кнопки */}
                {
                    <div className={styles.controls}>
                        <button onClick={handlePrevPage}>&lt;</button>
                        <button onClick={handleNextPage}>&gt;</button>
                    </div>
                }
            </div>


        </>

    )
}

export default PredictedPointsPage