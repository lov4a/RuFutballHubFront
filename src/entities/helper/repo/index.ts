import {api} from "../../../shared/api/axios.ts";
import {SEASON_ID} from "../../../shared/const";

const getCurrentTourNumberSlice = async () => {
    return api.get(`helper/get/current-tour-number/${SEASON_ID}`).then((res) => res.data)
}

export {getCurrentTourNumberSlice}