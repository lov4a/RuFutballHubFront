import { api } from '../../../../shared/api/axios'
import type {
  PlayerSeasonDto,
  UnderstatSeasonPlayerDto,
  ManualMatchRequest,
  FotMobSeasonPlayerDto
} from '../../../../shared/admin/matching/types'

export async function getPlayerSeasonsWithoutUnderstat(
  seasonId: string,
): Promise<PlayerSeasonDto[]> {
  const res = await api.get<PlayerSeasonDto[]>(
    `/admin/matching/without-understat/${seasonId}`,
  )
  return res.data
}

export async function getPlayerSeasonsWithoutFotmob(
  seasonId: string,
): Promise<PlayerSeasonDto[]> {
  const res = await api.get<PlayerSeasonDto[]>(
    `/admin/matching/without-fotmob/${seasonId}`,
  )
  return res.data
}

export async function getFotMobPlayersNotProcessed(): Promise<FotMobSeasonPlayerDto[]> {
  const res = await api.get<FotMobSeasonPlayerDto[]>(
    '/admin/matching/not-proceed-fotmob',
  )
  return res.data
}

export async function getUnderstatPlayersNotProcessed(): Promise<UnderstatSeasonPlayerDto[]> {
  const res = await api.get<UnderstatSeasonPlayerDto[]>(
    '/admin/matching/not-proceed-understat',
  )
  return res.data
}

export async function manualMatch(
  request: ManualMatchRequest,
): Promise<void> {
  await api.post('/admin/matching/manual-match', request)
}

