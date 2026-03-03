import {api} from "../../../shared/api/axios.ts";
import type {IGetExpectedPointsPort} from "../interface/port";
import type {IGetExpectedPointsDto} from "../interface/dto";

const getExpectedPointsSlice = async ({...params}: IGetExpectedPointsPort): Promise<IGetExpectedPointsDto> => {
    return api.get(`get/expected-points`, {params}).then((res) => res.data)
}

export {getExpectedPointsSlice}