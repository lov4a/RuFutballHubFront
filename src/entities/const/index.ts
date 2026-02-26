//TODO: перенести в нормальное место
import axios from "axios";

export const DEFAULT_URL = 'http://192.168.3.5:5154/api'

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: DEFAULT_URL,
        withCredentials: false
    });

    return instance;
};

const BACKEND_HTTPS_SERVICES = createAxiosInstance();

export { BACKEND_HTTPS_SERVICES }