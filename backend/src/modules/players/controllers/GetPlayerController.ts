import { Request, Response } from "express";

import { GetPlayerService } from "../services/GetPlayerService";
import { SyncBattleLogService } from "../services/SyncBattleLogService";

class GetPlayerController {
  async handle(req: Request, res: Response) {
    const { tag } = req.params;

    if (!tag || Array.isArray(tag)) {
      return res.status(400).json({
        error: "Invalid player tag",
      });
    }

    const getPlayerService = new GetPlayerService();
    const syncBattleLogService = new SyncBattleLogService();

    const player = await getPlayerService.execute(tag);

    await syncBattleLogService.execute(player.id, player.tag);

    return res.json(player);
  }
}

export { GetPlayerController };
