import {api} from "../../../shared/api/axios.ts";
import {SEASON_ID} from "../../../shared/const";

const getCurrentTourNumberSlice = async () => {
    return api.get(`helper/get/current-tour-number/598c15d1-e730-4365-8617-9bd9c24e7553`).then((res) => res.data)
}

export {getCurrentTourNumberSlice}