import { prisma } from "../../../lib/prisma";

class GetPlayerModeAnalyticsService {
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
    });

    const modeMap = new Map();

    for (const battle of battles) {
      if (!modeMap.has(battle.mode)) {
        modeMap.set(battle.mode, {
          mode: battle.mode,

          matches: 0,

          wins: 0,
          losses: 0,

          trophiesGained: 0,
        });
      }

      const stats = modeMap.get(battle.mode);

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
    }

    const modes = [...modeMap.values()]
      .map((mode) => ({
        mode: mode.mode,

        matches: mode.matches,

        wins: mode.wins,
        losses: mode.losses,

        winRate: Number(((mode.wins / mode.matches) * 100).toFixed(2)),

        trophiesGained: mode.trophiesGained,
      }))
      .sort((a, b) => b.matches - a.matches);

    return {
      player: {
        tag: player.tag,
        name: player.name,
      },

      modes,
    };
  }
}

export { GetPlayerModeAnalyticsService };
