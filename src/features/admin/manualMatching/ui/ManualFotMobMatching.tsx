import { ManualPlayerMatchingBase } from './ManualPlayerMatchingBase'

import {
  getFotMobPlayersNotProcessed,
  manualMatch,
  getPlayerSeasonsWithoutFotmob,
} from '../api/manualMatchingApi'

import type { FotMobSeasonPlayerDto } from '../../../../shared/admin/matching/types'

export function ManualFotMobMatching() {
  return (
    <ManualPlayerMatchingBase<FotMobSeasonPlayerDto>
      title="Ручное сопоставление FotMob"
      loadPlayerSeasons={() =>
        getPlayerSeasonsWithoutFotmob('598c15d1-e730-4365-8617-9bd9c24e7553')
      }
      loadTargets={getFotMobPlayersNotProcessed}
      getTargetId={(f) => f.fotMobPlayerSeasonId}
      getTargetLabel={(f) => f.playerFullName}
      onMatch={(playerSeasonId, fotmobId) =>
        manualMatch({
        playerSeasonId,
        fotMobPlayerId: fotmobId,
        understatPlayerId: null,
        })
      }
    />
  )
}
