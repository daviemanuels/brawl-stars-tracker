import { Request, Response } from "express";

import { GetPlayerProgressionService } from "../services/GetPlayerProgressionService";

type Params = {
  tag: string;
};

type Query = {
  from?: string;
  to?: string;
};

class GetPlayerProgressionController {
  async handle(req: Request<Params, unknown, unknown, Query>, res: Response) {
    const { tag } = req.params;

    const { from, to } = req.query;

    const getPlayerProgressionService = new GetPlayerProgressionService();

    const result = await getPlayerProgressionService.execute(tag, from, to);

    return res.json(result);
  }
}

export { GetPlayerProgressionController };
