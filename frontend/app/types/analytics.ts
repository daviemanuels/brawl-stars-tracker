export type PlayerAnalytics = {
  player: {
    tag: string;
    name: string;
  };

  winRate?: number;
  totalBattles?: number;
  victories?: number;
  defeats?: number;

  byMode?: Record<string, number>;

  [key: string]: unknown;
};
