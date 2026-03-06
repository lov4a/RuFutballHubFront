import { api } from '../../../shared/api/axios'

export async function getCurrentTour(seasonId: string) {
  console.log(seasonId)
  const { data } = await api.get<number>(
    `/helper/get/current-tour-number/${seasonId}`
  )

  return data
}