import { Router } from "express";

import { GetPlayerController } from "../controllers/GetPlayerController";
import { GetPlayerBattlesController } from "../controllers/GetPlayerBattlesController";
import { GetPlayerAnalyticsController } from "../../analytics/controllers/GetPlayerAnalyticsController";

const playerRoutes = Router();

const getPlayerController = new GetPlayerController();

const getPlayerBattlesController = new GetPlayerBattlesController();

const getPlayerAnalyticsController = new GetPlayerAnalyticsController();

playerRoutes.get("/:tag", getPlayerController.handle);

playerRoutes.get("/:tag/battles", getPlayerBattlesController.handle);

playerRoutes.get("/:tag/analytics", getPlayerAnalyticsController.handle);

export { playerRoutes };
