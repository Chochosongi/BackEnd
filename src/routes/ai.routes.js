// routes/ai.routes.js
import { Router } from "express";
import { analyzeDiet } from "../controllers/ai.controller.js";

const router = Router();
router.post("/analyze", analyzeDiet);
export default router;
