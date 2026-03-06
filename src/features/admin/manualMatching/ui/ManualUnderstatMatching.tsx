import { ManualPlayerMatchingBase } from './ManualPlayerMatchingBase'
import type { UnderstatSeasonPlayerDto } from '../../../../shared/admin/matching/types'
import {
  getPlayerSeasonsWithoutUnderstat,
  getUnderstatPlayersNotProcessed,
  manualMatch,
} from '../api/manualMatchingApi'

const SEASON_ID = import.meta.env.VITE_SEASON_ID as string

export function ManualUnderstatMatching() {
  return (
    <ManualPlayerMatchingBase<UnderstatSeasonPlayerDto>
      title="Ручное сопоставление Understat"
      loadPlayerSeasons={() =>
        getPlayerSeasonsWithoutUnderstat(SEASON_ID)
      }
      loadTargets={getUnderstatPlayersNotProcessed}
      getTargetId={(u) => u.understatPlayerSeasonId}
      getTargetLabel={(u) => u.playerFullName}
      onMatch={(playerSeasonId, understatId) =>
        manualMatch({
          playerSeasonId,
          understatPlayerId: understatId,
          fotMobPlayerId: null,
        })
      }
    />
  )
}
