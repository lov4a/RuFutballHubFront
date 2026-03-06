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
  lineupPosition?: number | null
}

export const PredictedLineupPlayerStatus = {
  Probable: 0,
  Question: 1,
  Injured: 2,
  Suspended: 3
} as const

export type PredictedLineupPlayerStatus =
  typeof PredictedLineupPlayerStatus[keyof typeof PredictedLineupPlayerStatus]

export const PredictedLineupPosition = {
  ВРТ: 0,
  ЗАЩ: 1,
  ПЗЩ: 2,
  НАП: 3,
  ПЗ: 4,
  ЦЗ: 5,
  ЛЗ: 6,
  ЦОП: 7,
  ЦП: 8,
  ЦАП: 9,
  ЛП: 10,
  ПП: 11,
  ЛФА: 12,
  ПФА: 13,
  ЦФД: 14,
  ФРВ: 15
} as const

export type PredictedLineupPosition =
  typeof PredictedLineupPosition[keyof typeof PredictedLineupPosition]