// src/routes/dietAnalyzer.routes.js
import express from "express";
import {
  extractKeywordsFromDietText,
  analyzeDietNutritionByKeywords,
  detectConflicts,
} from "../utils/dietAnalyzer.js";

const router = express.Router();

// ✅ 식단 키워드 분석 API
router.post("/analyze-keywords", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "텍스트가 필요합니다." });

  try {
    const result = await extractKeywordsFromDietText(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "키워드 분석 실패", error: err.message });
  }
});

// ✅ 추천 키워드에 대한 영양정보 조회 API
router.post("/nutrition-info", async (req, res) => {
  const { keywords } = req.body;
  if (!keywords || !keywords.recommended) {
    return res.status(400).json({ message: "추천 키워드가 필요합니다." });
  }

  try {
    const info = await analyzeDietNutritionByKeywords(keywords);
    res.json(info);
  } catch (err) {
    res
      .status(500)
      .json({ message: "영양 정보 분석 실패", error: err.message });
  }
});

// ✅ 충돌 키워드 탐지 API
router.post("/detect-conflicts", (req, res) => {
  const { keywords, allergies, diseases, diseaseGuide } = req.body;

  if (!keywords || !diseaseGuide) {
    return res.status(400).json({ message: "입력값이 부족합니다." });
  }

  try {
    const conflicts = detectConflicts(
      keywords,
      allergies || [],
      diseases || [],
      diseaseGuide
    );
    res.json({ conflicts });
  } catch (err) {
    res.status(500).json({ message: "충돌 분석 실패", error: err.message });
  }
});

export default router;
