interface ITours {
    expectedPoints: number
    matchDate: string
    opponent: string
    tourNumber: number
    isHome: boolean

}interface IItem {
    fullName: string
    playerSeasonId: string
    position: string
    price: number
    team: string
    tours: ITours[]
}

interface IGetExpectedPointsDto {
    pageNumber: number
    pageSize: number
    totalCount: number
    items: IItem[]
}

export type {IGetExpectedPointsDto, IItem, ITours}