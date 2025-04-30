import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  addFoodToLog,
  createDietLog,
  getAllDietLogs,
  getDietLogDetail,
  removeFoodFromLog,
} from "../controllers/diet.controller";

const router = Router();

router.post("/", authenticate, createDietLog);
router.post("/:logId/food", authenticate, addFoodToLog);
router.get("/", authenticate, getAllDietLogs);
router.get("/:logId", authenticate, getDietLogDetail);
router.delete("/:logId/food/:foodId", authenticate, removeFoodFromLog);

export default router;
