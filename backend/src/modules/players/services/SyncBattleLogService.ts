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

      if (isNaN(battleDate.getTime())) {
        continue;
      }

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

          rawData: item,
        },
      });

      // Solo/Duo Showdown
      if (item.battle.players) {
        let position = 1;

        for (const participant of item.battle.players) {
          if (!participant.brawler) {
            continue;
          }

          await prisma.battleParticipant.create({
            data: {
              battleId: battle.id,

              tag: participant.tag,
              name: participant.name,

              isMainPlayer:
                participant.tag.replace("#", "").toUpperCase() ===
                tag.replace("#", "").toUpperCase(),

              position,

              brawlerId: participant.brawler.id,
              brawlerName: participant.brawler.name,

              brawlerPower: participant.brawler.power,
              brawlerTrophies: participant.brawler.trophies,
            },
          });

          position++;
        }
      }

      // 3v3 / Ranked
      if (item.battle.teams) {
        for (const [teamIndex, team] of item.battle.teams.entries()) {
          for (const participant of team) {
            if (!participant.brawler) {
              continue;
            }

            await prisma.battleParticipant.create({
              data: {
                battleId: battle.id,

                tag: participant.tag,
                name: participant.name,

                isMainPlayer:
                  participant.tag.toUpperCase() === tag.toUpperCase(),

                team: teamIndex + 1,

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
  }
}

export { SyncBattleLogService };
