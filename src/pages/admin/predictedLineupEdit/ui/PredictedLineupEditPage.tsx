import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../app/providers/AuthProvider'
import { UserRole } from '../../../../shared/auth/roles'

import {
  getLineupsByTour,
  getTeamPlayersWithStatus,
  addPlayer,
  removePlayer
} from '../../../../features/admin/PredictedLineupEdit/api/api'

import type {
  PredictedLineupDto,
  TeamPlayerWithLineupStatusDto
} from '../../../../features/admin/PredictedLineupEdit/model/types'

import styles from './PredictedLineupEdit.module.css'

export function PredictedLineupEditPage() {
  const { seasonId, tourNumber } = useParams()
  const { roles } = useAuth()
  const isAdmin = roles.includes(UserRole.Admin)

  const [data, setData] = useState<
    {
      lineupId: string
      teamName: string
      teamSeasonId: string
      players: TeamPlayerWithLineupStatusDto[]
    }[]
  >([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!seasonId || !tourNumber) return

    const sId = seasonId
    const tNumber = Number(tourNumber)

    async function load() {
      setLoading(true)

      const lineups: PredictedLineupDto[] =
        await getLineupsByTour(sId, tNumber)

      const result = await Promise.all(
        lineups.map(async lineup => {
          const players =
            await getTeamPlayersWithStatus(
              lineup.teamSeasonId,
              tNumber
            )

          return {
            lineupId: lineup.id,
            teamName: lineup.teamName,
            teamSeasonId: lineup.teamSeasonId,
            players
          }
        })
      )

      setData(result)
      setLoading(false)
    }

    load()
  }, [seasonId, tourNumber])

  if (!isAdmin) return <div>Нет доступа</div>
  if (loading) return <div>Загрузка...</div>

  const handleToggle = async (
    lineupId: string,
    player: TeamPlayerWithLineupStatusDto
  ) => {
    if (player.isInLineup) {
      await removePlayer(lineupId, player.playerSeasonId)
    } else {
      await addPlayer(
        lineupId,
        player.playerSeasonId,
        player.status ?? 0,
        player.lineupPosition ?? 0
      )
    }

    setData(prev =>
      prev.map(block =>
        block.lineupId === lineupId
          ? {
              ...block,
              players: block.players.map(p =>
                p.playerSeasonId === player.playerSeasonId
                  ? {
                      ...p,
                      isInLineup: !p.isInLineup,
                      status: player.status,
                      lineupPosition: player.lineupPosition
                    }
                  : p
              )
            }
          : block
      )
    )
  }

  return (
    <div className={styles.page}>
      <h2>Редактирование ожидаемых составов</h2>

      {data.map(block => (
        <div key={block.lineupId} className={styles.block}>
          <h3>{block.teamName}</h3>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>В составе</th>
                <th>Игрок</th>
                <th>Позиция</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Позиция</th>
              </tr>
            </thead>
            <tbody>
              {block.players.map(player => (
                <tr key={player.playerSeasonId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.isInLineup}
                      onChange={() =>
                        handleToggle(
                          block.lineupId,
                          player
                        )
                      }
                    />
                  </td>
                  <td>{player.fullName}</td>
                  <td>{player.position}</td>
                  <td>{player.price}</td>
                  <td>
                    <select
                      value={player.status ?? 0}
                      onChange={e => {
                        const status = Number(e.target.value)

                        setData(prev =>
                          prev.map(block =>
                            block.lineupId === block.lineupId
                              ? {
                                  ...block,
                                  players: block.players.map(p =>
                                    p.playerSeasonId === player.playerSeasonId
                                      ? { ...p, status }
                                      : p
                                  )
                                }
                              : block
                          )
                        )
                      }}
                    >
                      <option value={0}>Probable</option>
                      <option value={1}>Question</option>
                      <option value={2}>Injured</option>
                      <option value={3}>Suspended</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={player.lineupPosition ?? 0}
                      onChange={e => {
                        const position = Number(e.target.value)

                        setData(prev =>
                          prev.map(block =>
                            block.lineupId === block.lineupId
                              ? {
                                  ...block,
                                  players: block.players.map(p =>
                                    p.playerSeasonId === player.playerSeasonId
                                      ? { ...p, lineupPosition: position }
                                      : p
                                  )
                                }
                              : block
                          )
                        )
                      }}
                    >
                      <option value={0}>ВРТ</option>
                      <option value={1}>ЗАЩ</option>
                      <option value={2}>ПЗЩ</option>
                      <option value={3}>НАП</option>
                      <option value={4}>ПЗ</option>
                      <option value={5}>ЦЗ</option>
                      <option value={6}>ЛЗ</option>
                      <option value={7}>ЦОП</option>
                      <option value={8}>ЦП</option>
                      <option value={9}>ЦАП</option>
                      <option value={10}>ЛП</option>
                      <option value={11}>ПП</option>
                      <option value={12}>ЛФА</option>
                      <option value={13}>ПФА</option>
                      <option value={14}>ЦФД</option>
                      <option value={15}>ФРВ</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}