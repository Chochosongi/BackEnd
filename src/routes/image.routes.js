import { Router } from "express";
import upload from "../utils/upload.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  uploadFoodImage,
  getImageAnalysisResult,
} from "../controllers/image.controller.js";

const router = Router();

router.post("/upload", authenticate, upload.single("image"), uploadFoodImage);
router.get("/:id/result", authenticate, getImageAnalysisResult);

export default router;
