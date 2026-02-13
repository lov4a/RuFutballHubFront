export type PlayerSeasonDto = {
  playerSeasonId: string
  playerFullName: string
  fantasyTeamName: string
  fantasyPosition: string
}

export type UnderstatSeasonPlayerDto = {
  understatPlayerSeasonId: string
  playerFullName: string
}

export type FotMobSeasonPlayerDto = {
  fotMobPlayerSeasonId: string
  playerFullName: string
}

export type ManualMatchRequest = {
  playerSeasonId: string
  understatPlayerId: string | null
  fotMobPlayerId: string | null
}
