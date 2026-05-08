import { prisma } from "../../../lib/prisma";

class GetPlayerBattlesService {
  async execute(tag: string, page = 1, limit = 20) {
    const formattedTag = tag.replace("#", "").toUpperCase();

    const player = await prisma.player.findFirst({
      where: {
        tag: `#${formattedTag}`,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    const skip = (page - 1) * limit;

    const [battles, total] = await Promise.all([
      prisma.battle.findMany({
        where: {
          playerId: player.id,
        },

        include: {
          participants: true,
        },

        orderBy: {
          battleTime: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.battle.count({
        where: {
          playerId: player.id,
        },
      }),
    ]);

    return {
      player: {
        tag: player.tag,
        name: player.name,
      },

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },

      battles,
    };
  }
}

export { GetPlayerBattlesService };
