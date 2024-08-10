import { Router } from "express";

import bossesData from "../data/bosses.js";

import BossesController from "../controllers/bosses.js";

const router = Router();

router.get("/", BossesController.getBosses);

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const boss = bossesData.find((boss) => boss.id === id);

  if (!boss) {
    return res.status(404).json({ message: `Boss with ID ${id} not found` });
  }

  res.status(200).json(boss);
});

export default router;
