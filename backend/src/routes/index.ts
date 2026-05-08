import { Router } from "express";

import { playerRoutes } from "../modules/players/routes/player.routes";
import { analyticsRoutes } from "../modules/analytics/routes/analytics.routes";

const router = Router();

router.use("/players", playerRoutes);
router.use("/analytics", analyticsRoutes);

export { router };
