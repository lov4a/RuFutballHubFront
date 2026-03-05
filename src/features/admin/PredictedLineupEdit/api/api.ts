import { api } from '../../../../shared/api/axios'
import type {
  PredictedLineupDto,
  TeamPlayerWithLineupStatusDto
} from '../model/types'

// Получить все составы тура
export async function getLineupsByTour(
  seasonId: string,
  tourNumber: number
) {
  const { data } = await api.get<PredictedLineupDto[]>(
    `/predicted-lineups/season/${seasonId}/tour/${tourNumber}`
  )

  return data
}

// Получить всех игроков команды с их статусом
export async function getTeamPlayersWithStatus(
  teamSeasonId: string,
  tourNumber: number
) {
  const { data } =
    await api.get<TeamPlayerWithLineupStatusDto[]>(
      `/predicted-lineups/admin/team/${teamSeasonId}/tour/${tourNumber}/players`
    )

  return data
}

// Добавить игрока
export async function addPlayer(
  lineupId: string,
  playerSeasonId: string,
  status: number,
  position: number
) {
  await api.post(`/predicted-lineups/admin/${lineupId}/players`, {
    playerSeasonId,
    status,
    position
  })
}
// Удалить игрока
export async function removePlayer(
  lineupId: string,
  playerSeasonId: string
) {
  await api.delete(
    `/predicted-lineups/admin/${lineupId}/players/${playerSeasonId}`
  )
}