import { api } from '../../../shared/api/axios'

export type FixtureItem = {
  tourNumber: number
  opponentShortName: string
  isHome: boolean
  difficultyLevel: number
}

export type TeamTicker = {
  teamSeasonId: string
  teamName: string
  fixtures: FixtureItem[]
}

export async function getFixtureTicker(
  seasonId: string,
  fromTour: number,
  toTour: number
) {
  const { data } = await api.get<TeamTicker[]>(
    `/fixtures/ticker`,
    {
      params: { seasonId, fromTour, toTour },
    }
  )

  return data
}