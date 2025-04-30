import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createHealthInfo,
  getHealthInfo,
  updateHealthInfo,
} from "../controllers/user.controller";

const router = Router();

router.post("/health", authenticate, createHealthInfo);
router.get("/health", authenticate, getHealthInfo);
router.put("/health", authenticate, updateHealthInfo);

export default router;
