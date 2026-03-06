interface IGetExpectedPointsPort {
    seasonId: string
    fromTour?: number
    toTour: number
    orderByTour?: number
    pageNumber: number
    pageSize: number
}

export type { IGetExpectedPointsPort }