import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function searchFoods(req, res) {
  const { name } = req.query;
  if (!name)
    return res.status(400).json({ message: "검색어(name)를 입력하세요." });

  try {
    // 1️⃣ OpenAPI 요청
    const apiUrl =
      "https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02";
    const response = await axios.get(apiUrl, {
      params: {
        serviceKey: process.env.FOOD_API_KEY,
        type: "json",
        pageNo: 1,
        numOfRows: 10,
        FOOD_NM_KR: name,
      },
    });

    const apiItems = response.data.body?.items;
    const apiResults = Array.isArray(apiItems)
      ? apiItems
      : apiItems
      ? [apiItems]
      : [];

    const openApiData = apiResults.map((item) => ({
      source: "openapi",
      foodName: item.FOOD_NM_KR,
      foodCategory: item.FOOD_CAT1_NM,
      manufacturer: item.MAKER_NM || "정보 없음",
      servingSize: item.SERVING_SIZE || "100g",
      calories: item.AMT_NUM2 || "0",
      carbohydrates: item.AMT_NUM5 || "0",
      protein: item.AMT_NUM6 || "0",
      fat: item.AMT_NUM3 || "0",
      sodium: item.AMT_NUM63 || "0",
      reference: item.SUB_REF_NAME || "",
      updateDate: item.UPDATE_DATE || "",
    }));

    // 2️⃣ Prisma DB 검색
    const dbResults = await prisma.rawIngredient.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    const dbData = dbResults.map((item) => ({
      source: "db",
      name: item.name,
      foodCategory: item.foodCategory,
      manufacturer: "원재료성 식품",
      servingSize: "100g",
      calories: item.energy.toString(),
      carbohydrates: item.carbohydrate.toString(),
      protein: item.protein.toString(),
      fat: item.fat.toString(),
      sodium: item.sodium.toString(),
      sourceName: item.sourceName,
    }));

    console.log(dbData);

    // 3️⃣ 합치기
    const mergedResults = [...openApiData, ...dbData];

    return res.status(200).json({
      isSuccess: true,
      code: "200",
      message: "식품 검색 성공",
      data: mergedResults,
    });
  } catch (error) {
    console.error("🔴 식품 검색 실패:", error.message);
    return res.status(500).json({
      isSuccess: false,
      code: "500",
      message: "식품 검색 실패",
      error: error.message,
    });
  }
}

export const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await prisma.food.findUnique({
      where: { id: Number(id) },
    });

    if (!food) return res.status(404).json({ message: "음식 없음" });

    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: "조회 실패" });
  }
};

export const createFood = async (req, res) => {
  const {
    name,
    barcode,
    calories,
    protein,
    fat,
    carbs,
    sugar,
    sodium,
    servingSize,
    imageUrl,
  } = req.body;

  try {
    const newFood = await prisma.food.create({
      data: {
        name,
        barcode,
        calories,
        protein,
        fat,
        carbs,
        sugar,
        sodium,
        servingSize,
        imageUrl,
      },
    });

    res.status(201).json(newFood);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "이미 존재하는 바코드입니다." });
    }
    res.status(500).json({ message: "음식 등록 실패" });
  }
};
