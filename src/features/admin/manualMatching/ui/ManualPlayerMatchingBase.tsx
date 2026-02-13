import { useEffect, useState } from 'react'
import type { PlayerSeasonDto } from '../../../../shared/admin/matching/types'

type Props<T> = {
  title: string

  loadPlayerSeasons: () => Promise<PlayerSeasonDto[]>

  loadTargets: () => Promise<T[]>

  getTargetId: (item: T) => string
  getTargetLabel: (item: T) => string

  onMatch: (playerSeasonId: string, targetId: string) => Promise<void>
}

export function ManualPlayerMatchingBase<T>({
  title,
  loadPlayerSeasons,
  loadTargets,
  getTargetId,
  getTargetLabel,
  onMatch,
}: Props<T>) {

  const [playerSeasons, setPlayerSeasons] = useState<PlayerSeasonDto[]>([])
  const [targets, setTargets] = useState<T[]>([])

  const [selectedPlayerSeason, setSelectedPlayerSeason] =
    useState<string | null>(null)

const [selectedTarget, setSelectedTarget] = useState<string | null>(null)

useEffect(() => {
  loadPlayerSeasons().then(setPlayerSeasons)
  loadTargets().then(setTargets)
}, [])

  const handleMatch = async () => {
    if (!selectedPlayerSeason || selectedTarget == null) return

    await onMatch(selectedPlayerSeason, selectedTarget)

    setPlayerSeasons((prev) =>
      prev.filter((p) => p.playerSeasonId !== selectedPlayerSeason),
    )

    setTargets((prev) =>
      prev.filter((t) => getTargetId(t) !== selectedTarget),
    )

    setSelectedPlayerSeason(null)
    setSelectedTarget(null)
  }

  return (
    <div>
      <h1>{title}</h1>

      <select
        value={selectedPlayerSeason ?? ''}
        onChange={(e) => setSelectedPlayerSeason(e.target.value)}
      >
        <option value="">Выберите PlayerSeason</option>
        {playerSeasons.map((p) => (
          <option key={p.playerSeasonId} value={p.playerSeasonId}>
            {p.playerFullName} — {p.fantasyTeamName} ({p.fantasyPosition})
          </option>
        ))}
      </select>

      <select
        value={selectedTarget ?? ''}
        onChange={(e) => setSelectedTarget(e.target.value)}
      >
        <option value="">Выберите игрока</option>
        {targets.map((t) => (
          <option key={getTargetId(t)} value={getTargetId(t)}>
            {getTargetLabel(t)}
          </option>
        ))}
      </select>

      <button
        onClick={handleMatch}
        disabled={!selectedPlayerSeason || selectedTarget == null}
      >
        Сопоставить
      </button>
    </div>
  )
}
