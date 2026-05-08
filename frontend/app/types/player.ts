export type Player = {
  id: string;
  tag: string;
  name: string;
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  soloVictories: number;
  duoVictories: number;
  totalVictories3v3: number;
  clubName?: string | null;
  clubTag?: string | null;
};
