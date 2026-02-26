import {useGetExpectedPointsUseCase} from "../../entities/predictedPoints/request";
import type {IItem} from "../../entities/predictedPoints/repo";
import {LAST_TOUR, TWO} from "../../shared/const";
import {useState} from "react";

const PredictedPointsPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data } = useGetExpectedPointsUseCase(currentPage)
    const currentTour = 19
    const titleTour = [];
    for (let i = currentTour; i <= LAST_TOUR; i++) {
        titleTour.push(<th key={i}>Тур {i}</th>);
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
            <div className="table-wrapper">
                <table className="sticky-table">
                    <thead>
                    <tr>
                        <th className="sticky-col">Игрок</th>
                        {titleTour}
                    </tr>
                    </thead>

                    <tbody>
                    {data?.items.map((item: IItem) => {
                        return (
                            <tr>
                            <th className="sticky-col">{item.fullName}</th>
                           {item.tours.map((tour) => {
                               return <td>{(tour.expectedPoints).toFixed(TWO)}</td>
                           })}
                           <></>
                            </tr>
                        )
                    })

                    }
                    </tbody>
                </table>
            </div>
            <button onClick={handlePrevPage}>&lt;</button>
            <button onClick={handleNextPage}>&gt;</button>
        </>

    )
}

export default PredictedPointsPage