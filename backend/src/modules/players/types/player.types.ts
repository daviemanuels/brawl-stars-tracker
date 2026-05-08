export interface BrawlPlayerResponse {
  tag: string;
  name: string;
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  "3vs3Victories": number;
  soloVictories: number;
  duoVictories: number;
  icon?: {
    id: number;
  };
  club?: {
    tag: string;
    name: string;
  };
}
