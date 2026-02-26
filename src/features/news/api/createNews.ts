import { api } from '../../../shared/api/axios'

export type CreateNewsRequest = {
  title: string
  summary: string
  content: string
  category: number
  mainImageId: string
  mobileImageId?: string | null
}

export async function createNews(payload: CreateNewsRequest) {
  const { data } = await api.post('/news', payload)
  return data as { id: string }
}
