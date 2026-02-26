import axios from 'axios'
import { authStorage } from '../lib/authStorage'

export const api = axios.create({
  baseURL: 'http://192.168.3.5:5154/api',
})

api.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
