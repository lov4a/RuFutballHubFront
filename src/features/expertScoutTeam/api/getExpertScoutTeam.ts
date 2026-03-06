import { api } from '../../../shared/api/axios'
import type { ExpertScoutTeamResponse } from '../model/types'

export async function getExpertScoutTeam(
  seasonId: string,
  tour: number
) {
  const { data } = await api.get<ExpertScoutTeamResponse>(
    `/expert-teams/season/${seasonId}/tour/${tour}`
  )

  return data
}