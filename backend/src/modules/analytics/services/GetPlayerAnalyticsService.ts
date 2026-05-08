import { prisma } from "../../../lib/prisma";

class GetPlayerAnalyticsService {
  async execute(tag: string) {
    const formattedTag = tag.replace("#", "").toUpperCase();

    const cacheKey = `player:${formattedTag}:analytics`;

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

    const totalBattles = battles.length;

    const wins = battles.filter((battle) => {
      if (battle.result === "victory") {
        return true;
      }

      if (battle.rank && battle.rank <= 4) {
        return true;
      }

      return false;
    }).length;

    const losses = totalBattles - wins;

    const winRate =
      totalBattles > 0 ? Number(((wins / totalBattles) * 100).toFixed(2)) : 0;

    // Favorite Brawler
    const brawlerMap = new Map<
      number,
      {
        id: number;
        name: string;
        matches: number;
      }
    >();

    for (const battle of battles) {
      const mainPlayer = battle.participants.find(
        (participant) => participant.isMainPlayer,
      );

      if (!mainPlayer) {
        continue;
      }

      const existing = brawlerMap.get(mainPlayer.brawlerId);

      if (existing) {
        existing.matches++;
      } else {
        brawlerMap.set(mainPlayer.brawlerId, {
          id: mainPlayer.brawlerId,
          name: mainPlayer.brawlerName,
          matches: 1,
        });
      }
    }

    const favoriteBrawler = [...brawlerMap.values()].sort(
      (a, b) => b.matches - a.matches,
    )[0];

    // Favorite Mode
    const modeMap = new Map<
      string,
      {
        mode: string;
        matches: number;
      }
    >();

    for (const battle of battles) {
      const existing = modeMap.get(battle.mode);

      if (existing) {
        existing.matches++;
      } else {
        modeMap.set(battle.mode, {
          mode: battle.mode,
          matches: 1,
        });
      }
    }

    const favoriteMode = [...modeMap.values()].sort(
      (a, b) => b.matches - a.matches,
    )[0];

    // Average Rank
    const rankedBattles = battles.filter((battle) => battle.rank !== null);

    const averageRank =
      rankedBattles.length > 0
        ? Number(
            (
              rankedBattles.reduce(
                (acc, battle) => acc + (battle.rank || 0),
                0,
              ) / rankedBattles.length
            ).toFixed(2),
          )
        : null;

    // Trophy Gain
    const trophiesGained = battles.reduce(
      (acc, battle) => acc + (battle.trophyChange || 0),
      0,
    );

    const result = {
      player: {
        tag: player.tag,
        name: player.name,
      },

      analytics: {
        totalBattles,

        wins,
        losses,

        winRate,

        favoriteBrawler,

        favoriteMode,

        averageRank,

        trophiesGained,
      },
    };

    return result;
  }
}

export { GetPlayerAnalyticsService };
