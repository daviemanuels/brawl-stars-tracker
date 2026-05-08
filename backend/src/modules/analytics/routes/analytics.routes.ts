import { Router } from "express";

import { GetPlayerProgressionController } from "../controllers/GetPlayerProgressionController";
import { GetPlayerAnalyticsController } from "../controllers/GetPlayerAnalyticsController";

const analyticsRoutes = Router();

const getPlayerProgressionController = new GetPlayerProgressionController();
const getPlayerAnalyticsController = new GetPlayerAnalyticsController();

analyticsRoutes.get(
  "/players/:tag/progression",
  getPlayerProgressionController.handle,
);

analyticsRoutes.get("/:tag/analytics", getPlayerAnalyticsController.handle);

export { analyticsRoutes };
