import {
  extractKeywordsFromDietText,
  analyzeDietNutritionByKeywords,
  detectConflicts,
} from "../utils/dietAnalyzer.js";

export async function analyzeDiet(req, res) {
  const { text, allergies, diseases } = req.body;

  const keywords = extractKeywordsFromDietText(text);
  const nutritionData = await analyzeDietNutritionByKeywords(keywords);

  // 임시 disease 가이드 (나중에 DB 또는 JSON 파일에서 불러오기)
  const diseaseGuide = {
    diabetes: {
      avoid: ["sugar", "syrup", "honey"],
    },
    hypertension: {
      avoid: ["salt", "sodium"],
    },
  };

  const conflicts = detectConflicts(
    keywords,
    allergies,
    diseases,
    diseaseGuide
  );

  res.json({ keywords, nutritionData, conflicts });
}
