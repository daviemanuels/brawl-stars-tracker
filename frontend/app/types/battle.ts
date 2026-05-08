export type BattleParticipant = {
  id: string;
  tag: string;
  name: string;
  isMainPlayer: boolean;
  team?: number | null;
  position?: number | null;
  brawlerId: number;
  brawlerName: string;
  brawlerPower: number;
  brawlerTrophies: number;
};

export type Battle = {
  id: string;
  battleTime: string;
  mode: string;
  result: string;
  rank?: number | null;
  duration?: number | null;
  trophyChange?: number | null;
  map?: string | null;
  participants: BattleParticipant[];
};

export type BattlesResponse = {
  player: {
    tag: string;
    name: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  battles: Battle[];
};
