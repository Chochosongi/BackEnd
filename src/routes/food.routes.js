import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createFood,
  getFoodById,
  searchFoods,
} from "../controllers/food.controller.js";

const router = Router();

router.get("/search", searchFoods);
router.get("/:id", getFoodById);
router.post("/", authenticate, createFood); // 로그인한 사용자만 등록 가능

export default router;
