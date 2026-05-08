import { Router } from "express";

import { GetPlayerController } from "../controllers/GetPlayerController";

const playerRoutes = Router();

const getPlayerController = new GetPlayerController();

playerRoutes.get("/:tag", getPlayerController.handle);

export { playerRoutes };
