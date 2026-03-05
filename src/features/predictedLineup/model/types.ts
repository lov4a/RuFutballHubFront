export type PredictedLineupPlayerDto = {
  playerSeasonId: string
  fullName: string
  position: string
  teamName: string
  price: number
  status: string
}

export type PredictedLineupDto = {
  id: string
  teamSeasonId: string
  teamName: string
  tourNumber: number
  updateAt: string
  players: PredictedLineupPlayerDto[]
}