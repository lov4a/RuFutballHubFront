import {useQuery} from "@tanstack/react-query";
import {EQueryKeys} from "../../../shared/enum/query-keys";
import {getCurrentTourNumberSlice} from "../repo";

export const useGetCurrentTourNumberCase = () => {
    const execute = async () => {
        return getCurrentTourNumberSlice();
    };

    return useQuery({
        queryFn: execute,
        queryKey: [EQueryKeys.GET_CURRENT_TOUR_NUMBER],
    });
};
