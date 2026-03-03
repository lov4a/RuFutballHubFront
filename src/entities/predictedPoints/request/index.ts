import {getExpectedPointsSlice} from "../repo";
import {useQuery} from "@tanstack/react-query";
import {LAST_TOUR, SEASON_ID} from "../../../shared/const";
import {EQueryKeys} from "../../../shared/enum/query-keys";

export const useGetExpectedPointsCase = (pageNumber: number, fromTour?: number) => {
    const execute = async () => {
        return getExpectedPointsSlice({seasonId: SEASON_ID, fromTour: fromTour, toTour : LAST_TOUR, orderByTour : 23, pageNumber : pageNumber, pageSize : 20});
    };

    return useQuery({
        queryFn: execute,
        queryKey: [EQueryKeys.GET_EXPECTED_POINTS, pageNumber],
        enabled: !!fromTour
    });
};
