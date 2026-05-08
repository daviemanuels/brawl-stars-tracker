import { prisma } from "../../../lib/prisma";
import { brawlApi } from "../../../lib/axios";
import { parseBattleTime } from "../utils/parseBattleTime";

class SyncBattleLogService {
  async execute(playerId: string, tag: string) {
    const formattedTag = encodeURIComponent(tag.replace("#", ""));

    const response = await brawlApi.get(
      `/players/%23${formattedTag}/battlelog`,
    );

    const items = response.data.items;

    for (const item of items) {
      const battleDate = parseBattleTime(item.battleTime);

      const existingBattle = await prisma.battle.findFirst({
        where: {
          playerId,
          battleTime: battleDate,
          mode: item.battle.mode,
        },
      });

      if (existingBattle) {
        continue;
      }

      const battle = await prisma.battle.create({
        data: {
          battleTime: battleDate,

          mode: item.battle.mode,
          modeId: item.event?.modeId,

          type: item.battle.type,

          result: item.battle.result,

          rank: item.battle.rank,

          duration: item.battle.duration,

          trophyChange: item.battle.trophyChange,

          map: item.event?.map,

          eventId: item.event?.id,

          playerId,
        },
      });

      const participants = [
        ...(item.battle.teams || []).flat(),
        ...(item.battle.players || []),
      ];

      for (const participant of participants) {
        if (!participant.brawler) {
          continue;
        }

        await prisma.battleParticipant.create({
          data: {
            battleId: battle.id,
            tag: participant.tag,
            name: participant.name,
            brawlerId: participant.brawler.id,
            brawlerName: participant.brawler.name,
            brawlerPower: participant.brawler.power,
            brawlerTrophies: participant.brawler.trophies,
          },
        });
      }
    }
  }
}

export { SyncBattleLogService };
