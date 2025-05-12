// dietAnalyzer.js
import keywordExtractor from "keyword-extractor";
import axios from "axios";

// ✅ 키워드 추출 (문장 단위 처리 없음)
export function extractKeywordsFromDietText(text) {
  const sentences = text.split(/[.!?]\s+/);
  const positive_keywords = new Set();
  const negative_keywords = new Set();

  for (const sentence of sentences) {
    const lowered = sentence.toLowerCase();
    const keywords = keywordExtractor.extract(sentence, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    if (
      [
        "avoid",
        "not recommended",
        "dangerous",
        "do not eat",
        "should not eat",
      ].some((term) => lowered.includes(term))
    ) {
      keywords.forEach((kw) => negative_keywords.add(kw));
    } else if (
      [
        "recommended",
        "good choice",
        "should eat",
        "beneficial",
        "healthy",
        "safe",
      ].some((term) => lowered.includes(term))
    ) {
      keywords.forEach((kw) => positive_keywords.add(kw));
    }
  }

  return {
    recommended: Array.from(positive_keywords),
    to_avoid: Array.from(negative_keywords),
  };
}

// ✅ 추천 키워드 영양 정보 가져오기 (OpenFoodFacts)
export async function analyzeDietNutritionByKeywords(keywordsDict) {
  const result = {};
  for (const keyword of keywordsDict.recommended || []) {
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl`,
        {
          params: {
            search_terms: keyword,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );
      result[keyword] = res.data.products?.[0] || null;
    } catch (e) {
      result[keyword] = null;
    }
  }
  return result;
}

// ✅ 알레르기 및 질병 충돌 탐지
export function detectConflicts(
  keywordsDict,
  allergies,
  diseases,
  diseaseGuide
) {
  const allKeywords = [
    ...(keywordsDict.recommended || []),
    ...(keywordsDict.to_avoid || []),
  ];
  const conflicts = new Set();

  allergies.forEach((allergy) => {
    allKeywords.forEach((kw) => {
      if (kw.toLowerCase().includes(allergy.toLowerCase())) {
        conflicts.add(kw);
      }
    });
  });

  diseases.forEach((disease) => {
    const info = diseaseGuide[disease.toLowerCase()];
    if (info) {
      info.avoid.forEach((forbidden) => {
        allKeywords.forEach((kw) => {
          if (kw.toLowerCase().includes(forbidden.toLowerCase())) {
            conflicts.add(kw);
          }
        });
      });
    }
  });

  return Array.from(conflicts);
}
