import { Request, Response } from "express";

import { GetPlayerBattlesService } from "../services/GetPlayerBattlesService";

type Params = {
  tag: string;
};

type Query = {
  page?: string;
  limit?: string;
};

class GetPlayerBattlesController {
  async handle(req: Request<Params, unknown, unknown, Query>, res: Response) {
    const { tag } = req.params;

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const getPlayerBattlesService = new GetPlayerBattlesService();

    const result = await getPlayerBattlesService.execute(tag, page, limit);

    return res.json(result);
  }
}

export { GetPlayerBattlesController };
