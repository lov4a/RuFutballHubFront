import { ManualPlayerMatchingBase } from './ManualPlayerMatchingBase'

import {
  getFotMobPlayersNotProcessed,
  manualMatch,
  getPlayerSeasonsWithoutFotmob,
} from '../api/manualMatchingApi'

import type { FotMobSeasonPlayerDto } from '../../../../shared/admin/matching/types'

const SEASON_ID = import.meta.env.VITE_SEASON_ID as string

export function ManualFotMobMatching() {
  return (
    <ManualPlayerMatchingBase<FotMobSeasonPlayerDto>
      title="Ручное сопоставление FotMob"
      loadPlayerSeasons={() =>
        getPlayerSeasonsWithoutFotmob(SEASON_ID)
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
