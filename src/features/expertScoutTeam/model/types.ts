export type Position =
  | "GOALKEEPER"
  | "DEFENDER"
  | "MIDFIELDER"
  | "FORWARD";

export interface ExpertPlayer {
  playerSeasonId: string;
  fullName: string;
  position: Position;
  teamName: string;
  price: number;
  bench: boolean;
}

export type ExpertScoutTeamResponse = {
  id: string
  seasonId: string
  tourNumber: number
  published: boolean
  updateAt: string
  players: ExpertPlayer[]
}