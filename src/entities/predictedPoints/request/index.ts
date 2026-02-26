import {getExpectedPointsSlice} from "../repo";
import {useQuery} from "@tanstack/react-query";
import {LAST_TOUR, SEASON_ID} from "../../../shared/const";

export const useGetExpectedPointsUseCase = (pageNumber: number) => {
    const execute = async () => {
        return getExpectedPointsSlice({seasonId: SEASON_ID, fromTour: 19, toTour : LAST_TOUR, orderByTour : 23, pageNumber : pageNumber, pageSize : 20});
    };

    return useQuery({
        queryFn: execute,
        queryKey: ['111', pageNumber],
    });
};
