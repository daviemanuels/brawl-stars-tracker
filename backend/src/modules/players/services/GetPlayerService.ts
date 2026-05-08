import { prisma } from "../../../lib/prisma";
import { brawlApi } from "../../../lib/axios";

import { BrawlPlayerResponse } from "../types/player.types";

class GetPlayerService {
  async execute(tag: string) {
    const formattedTag = encodeURIComponent(tag.replace("#", ""));

    const response = await brawlApi.get<BrawlPlayerResponse>(
      `/players/%23${formattedTag}`,
    );

    const data = response.data;

    const player = await prisma.player.upsert({
      where: {
        tag: data.tag,
      },
      update: {
        name: data.name,
        trophies: data.trophies,
        highestTrophies: data.highestTrophies,
        expLevel: data.expLevel,
        totalVictories3v3: data["3vs3Victories"],
        soloVictories: data.soloVictories,
        duoVictories: data.duoVictories,
        clubTag: data.club?.tag,
        clubName: data.club?.name,
        iconId: data.icon?.id,
      },
      create: {
        tag: data.tag,
        name: data.name,
        trophies: data.trophies,
        highestTrophies: data.highestTrophies,
        expLevel: data.expLevel,
        totalVictories3v3: data["3vs3Victories"],
        soloVictories: data.soloVictories,
        duoVictories: data.duoVictories,
        clubTag: data.club?.tag,
        clubName: data.club?.name,
        iconId: data.icon?.id,
      },
    });

    return player;
  }
}

export { GetPlayerService };
