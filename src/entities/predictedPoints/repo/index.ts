import {BACKEND_HTTPS_SERVICES} from "../../const";

interface IGetExpectedPointsPort {
    seasonId: string
    fromTour: number
    toTour: number
    orderByTour: number
    pageNumber: number
    pageSize: number
}

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

const getExpectedPointsSlice = async ({...params}: IGetExpectedPointsPort): Promise<IGetExpectedPointsDto> => {
    return BACKEND_HTTPS_SERVICES.get(`get/expected-points`, {params}).then((res) => res.data)
}

export {getExpectedPointsSlice}

export type {
    IGetExpectedPointsDto, IItem
}