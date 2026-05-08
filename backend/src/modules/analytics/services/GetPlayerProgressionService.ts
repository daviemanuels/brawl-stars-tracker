import { prisma } from "../../../lib/prisma";

class GetPlayerProgressionService {
  async execute(tag: string, from?: string, to?: string) {
    const formattedTag = tag.replace("#", "").toUpperCase();

    const player = await prisma.player.findFirst({
      where: {
        tag: `#${formattedTag}`,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    const where: any = {
      playerId: player.id,
    };

    if (from || to) {
      where.battleTime = {};
    }

    if (from) {
      where.battleTime.gte = new Date(`${from}T00:00:00.000Z`);
    }

    if (to) {
      where.battleTime.lte = new Date(`${to}T23:59:59.999Z`);
    }

    const battles = await prisma.battle.findMany({
      where,

      orderBy: {
        battleTime: "asc",
      },
    });

    const dailyMap = new Map<
      string,
      {
        date: string;
        matches: number;
        wins: number;
        losses: number;
        trophiesGained: number;
        totalRank: number;
        rankedMatches: number;
      }
    >();

    let totalWins = 0;
    let totalLosses = 0;
    let totalTrophies = 0;

    for (const battle of battles) {
      const date = battle.battleTime.toISOString().split("T")[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,

          matches: 0,

          wins: 0,
          losses: 0,

          trophiesGained: 0,

          totalRank: 0,
          rankedMatches: 0,
        });
      }

      const dayData = dailyMap.get(date)!;

      dayData.matches++;

      const isWin =
        battle.result === "victory" ||
        (battle.rank !== null && battle.rank <= 4);

      if (isWin) {
        dayData.wins++;
        totalWins++;
      } else {
        dayData.losses++;
        totalLosses++;
      }

      const trophyChange = battle.trophyChange || 0;

      dayData.trophiesGained += trophyChange;

      totalTrophies += trophyChange;

      if (battle.rank !== null) {
        dayData.totalRank += battle.rank;
        dayData.rankedMatches++;
      }
    }

    const daily = [...dailyMap.values()].map((day) => ({
      date: day.date,

      matches: day.matches,

      wins: day.wins,
      losses: day.losses,

      winRate:
        day.matches > 0
          ? Number(((day.wins / day.matches) * 100).toFixed(2))
          : 0,

      trophiesGained: day.trophiesGained,

      averageRank:
        day.rankedMatches > 0
          ? Number((day.totalRank / day.rankedMatches).toFixed(2))
          : null,
    }));

    const totalBattles = battles.length;

    return {
      player: {
        tag: player.tag,
        name: player.name,
      },

      filters: {
        from: from || null,
        to: to || null,
      },

      summary: {
        totalBattles,

        wins: totalWins,
        losses: totalLosses,

        winRate:
          totalBattles > 0
            ? Number(((totalWins / totalBattles) * 100).toFixed(2))
            : 0,

        trophiesGained: totalTrophies,
      },

      daily,
    };
  }
}

export { GetPlayerProgressionService };
