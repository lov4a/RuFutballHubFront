import { ManualPlayerMatchingBase } from './ManualPlayerMatchingBase'
import type { UnderstatSeasonPlayerDto } from '../../../../shared/admin/matching/types'
import {
  getPlayerSeasonsWithoutUnderstat,
  getUnderstatPlayersNotProcessed,
  manualMatch,
} from '../api/manualMatchingApi'

export function ManualUnderstatMatching() {
  return (
    <ManualPlayerMatchingBase<UnderstatSeasonPlayerDto>
      title="Ручное сопоставление Understat"
      loadPlayerSeasons={() =>
        getPlayerSeasonsWithoutUnderstat('598c15d1-e730-4365-8617-9bd9c24e7553')
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
