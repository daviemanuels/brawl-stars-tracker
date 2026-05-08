import { Router } from "express";

import { playerRoutes } from "../modules/players/routes/player.routes";

const router = Router();

router.use("/players", playerRoutes);

export { router };
