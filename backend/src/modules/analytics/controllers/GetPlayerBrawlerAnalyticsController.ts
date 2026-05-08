import { Request, Response } from "express";

import { GetPlayerBrawlerAnalyticsService } from "../services/GetPlayerBrawlerAnalyticsService";

type Params = {
  tag: string;
};

class GetPlayerBrawlerAnalyticsController {
  async handle(req: Request<Params>, res: Response) {
    const { tag } = req.params;

    const service = new GetPlayerBrawlerAnalyticsService();

    const result = await service.execute(tag);

    return res.json(result);
  }
}

export { GetPlayerBrawlerAnalyticsController };
