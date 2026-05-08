import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Brawl Stars Tracker API running",
  });
});

export { router };
