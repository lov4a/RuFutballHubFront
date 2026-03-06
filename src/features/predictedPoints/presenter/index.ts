import { useState } from 'react'
import { useGetCurrentTourNumberCase } from '../../../entities/helper/request'
import { useGetExpectedPointsCase } from '../../../entities/predictedPoints/request'
import { useIsMobile } from '../../../shared/utils/sizeWindows'
import { LAST_TOUR } from '../../../shared/const'

export type TourCell = {
  expectedPoints: number
  isHome: boolean
}

export type PlayerRow = {
  id: number
  name: string
  tours: TourCell[]
}

type PredictedPointsBlockPresenterReturn = {
  leftHeaders: string[]
  players: PlayerRow[]
  tours: number[]
  loading: boolean
  handlePrevPage: () => void
  handleNextPage: () => void
}

const PredictedPointsBlockPresenter = (): PredictedPointsBlockPresenterReturn => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: currentTour, isLoading: tourLoading } = useGetCurrentTourNumberCase()
  const { data: expectedPoints, isLoading: pointsLoading } = useGetExpectedPointsCase(
    currentPage,
    currentTour,
  )

  const loading = tourLoading || pointsLoading

  const isMobile = useIsMobile()

  const leftHeaders = isMobile ? ['Игрок'] : ['№', 'Игрок']

  const players: PlayerRow[] =
    expectedPoints?.items?.map((item, index) => ({
      id: index + (expectedPoints?.pageNumber - 1) * 15 + 1,
      name: item.fullName,
      tours: item.tours.map((t) => ({
        expectedPoints: t.expectedPoints,
        isHome: t.isHome,
      })),
    })) ?? []

  const tours = Array.from({ length: LAST_TOUR - currentTour + 1 }, (_, i) => currentTour + i)

  const handleNextPage = () => setCurrentPage((p) => Math.min(LAST_TOUR, p + 1))

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1))

  return {
    leftHeaders,
    players,
    tours,
    loading,
    handlePrevPage,
    handleNextPage,
  }
}

export { PredictedPointsBlockPresenter }
