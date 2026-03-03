import { api } from '../../../shared/api/axios'
import type { PredictedLineupDto } from '../model/types'

export async function getLineups(
  seasonId: string,
  tourNumber: number
) {
  const { data } = await api.get<PredictedLineupDto[]>(
    `/predicted-lineups/season/${seasonId}/tour/${tourNumber}`
  )

  return data
}