export type PredictedLineupDto = {
  id: string
  teamSeasonId: string
  teamName: string
  tourNumber: number
  updateAt: string
}

export type TeamPlayerWithLineupStatusDto = {
  playerSeasonId: string
  fullName: string
  position: string
  teamName: string
  price: number
  isInLineup: boolean
  status?: number | null
}