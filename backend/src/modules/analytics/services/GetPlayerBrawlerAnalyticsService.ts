import { prisma } from "../../../lib/prisma";

class GetPlayerBrawlerAnalyticsService {
  async execute(tag: string) {
    const formattedTag = tag.replace("#", "").toUpperCase();

    const player = await prisma.player.findFirst({
      where: {
        tag: `#${formattedTag}`,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    const battles = await prisma.battle.findMany({
      where: {
        playerId: player.id,
      },

      include: {
        participants: true,
      },
    });

    const brawlerMap = new Map();

    for (const battle of battles) {
      const mainPlayer = battle.participants.find(
        (participant) => participant.isMainPlayer,
      );

      if (!mainPlayer) {
        continue;
      }

      const key = mainPlayer.brawlerId;

      if (!brawlerMap.has(key)) {
        brawlerMap.set(key, {
          id: mainPlayer.brawlerId,
          name: mainPlayer.brawlerName,

          matches: 0,

          wins: 0,
          losses: 0,

          trophiesGained: 0,

          totalRank: 0,
          rankedMatches: 0,
        });
      }

      const stats = brawlerMap.get(key);

      stats.matches++;

      const isWin =
        battle.result === "victory" ||
        (battle.rank !== null && battle.rank <= 4);

      if (isWin) {
        stats.wins++;
      } else {
        stats.losses++;
      }

      stats.trophiesGained += battle.trophyChange || 0;

      if (battle.rank !== null) {
        stats.totalRank += battle.rank;
        stats.rankedMatches++;
      }
    }

    const brawlers = [...brawlerMap.values()]
      .map((brawler) => ({
        id: brawler.id,

        name: brawler.name,

        matches: brawler.matches,

        wins: brawler.wins,
        losses: brawler.losses,

        winRate: Number(((brawler.wins / brawler.matches) * 100).toFixed(2)),

        trophiesGained: brawler.trophiesGained,

        averageRank:
          brawler.rankedMatches > 0
            ? Number((brawler.totalRank / brawler.rankedMatches).toFixed(2))
            : null,
      }))
      .sort((a, b) => b.matches - a.matches);

    return {
      player: {
        tag: player.tag,
        name: player.name,
      },

      brawlers,
    };
  }
}

export { GetPlayerBrawlerAnalyticsService };
