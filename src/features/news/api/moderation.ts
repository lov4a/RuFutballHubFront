import { api } from '../../../shared/api/axios'

export type AdminNewsItem = {
  id: string
  title: string
  summary: string
  status: number
  createdAt: string
}

export async function getNewsForModeration() {
  const { data } = await api.get('/news/moderation')
  return data as AdminNewsItem[]
}

export async function publishNews(id: string, order?: number) {
  await api.post(`/news/${id}/publish`, null, {
    params: { order },
  })
}

export async function rejectNews(id: string, comment: string) {
  await api.post(`/news/${id}/reject`, comment, {
    headers: { 'Content-Type': 'application/json' },
  })
}