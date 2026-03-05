import { api } from '../../../shared/api/axios'

export type MatchDto = {
  id: string
  homeTeamSeasonId: string
  awayTeamSeasonId: string
  homeTeamName: string
  awayTeamName: string
  kickOffTime: string
}

export async function getTourMatches(
  seasonId: string,
  tourNumber: number
) {
  const { data } = await api.get<MatchDto[]>(
    `/helper/get/tour-matches/season/${seasonId}/tour/${tourNumber}`
  )

  return data
}