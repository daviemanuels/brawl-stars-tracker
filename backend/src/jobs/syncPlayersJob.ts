import cron from "node-cron";

import { prisma } from "../lib/prisma";

import { SyncBattleLogService } from "../modules/players/services/SyncBattleLogService";

cron.schedule("*/10 * * * *", async () => {
  console.log("Running players sync...");

  const players = await prisma.player.findMany({
    take: 50,
  });

  for (const player of players) {
    try {
      const service = new SyncBattleLogService();

      await service.execute(player.id, player.tag);

      console.log(`Player synced: ${player.name}`);
    } catch (error) {
      console.error(error);
    }
  }
});
