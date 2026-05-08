import { Request, Response } from "express";

import { GetPlayerAnalyticsService } from "../services/GetPlayerAnalyticsService";

type Params = {
  tag: string;
};

class GetPlayerAnalyticsController {
  async handle(req: Request<Params>, res: Response) {
    const { tag } = req.params;

    const getPlayerAnalyticsService = new GetPlayerAnalyticsService();

    const result = await getPlayerAnalyticsService.execute(tag);

    return res.json(result);
  }
}

export { GetPlayerAnalyticsController };
