import axios from "axios";
import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
const prisma = new PrismaClient();

dotenv.config();

export const createDietLog = async (req, res) => {
  const userId = req.user.userId;
  const { date, mealType, notes } = req.body;

  if (!date || !mealType) {
    return res.status(400).json({ message: "날짜와 식사 종류는 필수입니다." });
  }

  try {
    // 1. 식단 로그 생성
    const log = await prisma.userDietLog.create({
      data: {
        userId,
        date: new Date(date),
        mealType,
        notes,
      },
    });

    // 2. 음식 이름 추출 (쉼표로 구분)
    const foodNames = notes
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (foodNames.length === 0) {
      return res.status(201).json({
        message: "식단 추가 성공 (음식 없음)",
        dietLog: log,
        matchedFoods: [],
      });
    }

    // 3. OpenAI API 호출
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
다음은 식사 기록에 포함된 음식 항목입니다:
${foodNames.map((f) => `- ${f}`).join("\n")}

각 음식에 대해 다음 4가지 영양소 정보를 표 형식으로 추정해 주세요:
1. 에너지 (kcal)
2. 나트륨 (mg)
3. 당 (g)
4. 단백질 (g)

형식:
음식 | 칼로리 (kcal) | 나트륨 (mg) | 당 (g) | 단백질 (g)
`;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "당신은 음식 영양소를 추정하는 AI입니다." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const tableText = chatResponse.choices[0]?.message?.content || "";
    const matchedFoods = [];

    const lines = tableText
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.includes("|") &&
          !line.toLowerCase().includes("음식") &&
          !line.startsWith("---")
      );

    for (const line of lines) {
      const [name, kcal, sodium, sugar, protein] = line
        .split("|")
        .map((s) => s.trim());

      // 결과 저장
      const foodData = {
        name,
        energy: parseFloat(kcal),
        sodium: parseFloat(sodium),
        sugar: parseFloat(sugar),
        protein: parseFloat(protein),
      };

      matchedFoods.push(foodData);

      await prisma.dietLogFoodInfo.create({
        data: {
          dietLogId: log.id,
          ...foodData,
        },
      });
    }

    return res.status(201).json({
      message: "식단 추가 성공",
      dietLog: log,
      matchedFoods,
    });
  } catch (error) {
    console.error("식단 추가 실패:", error);
    return res.status(500).json({
      message: "서버 오류로 인해 식단을 추가할 수 없습니다.",
      error: error.message,
    });
  }
};

export const addFoodToLog = async (req, res) => {
  const { logId } = req.params;
  const { foodName } = req.body;

  if (!foodName) {
    return res.status(400).json({ message: "음식 이름이 필요합니다." });
  }

  try {
    // 1. GPT 프롬프트 생성
    const prompt = `
다음 음식에 대해 다음 4가지 영양소 정보를 표 형식으로 추정해 주세요:
- ${foodName}

각 항목:
1. 에너지 (kcal)
2. 나트륨 (mg)
3. 당 (g)
4. 단백질 (g)

형식:
음식 | 칼로리 (kcal) | 나트륨 (mg) | 당 (g) | 단백질 (g)
`;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "당신은 음식 영양소를 추정하는 AI입니다." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const responseText = response.choices[0]?.message?.content || "";

    // 2. GPT 응답에서 테이블 라인 파싱
    const lines = responseText
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.includes("|") &&
          !line.toLowerCase().includes("음식") &&
          !line.startsWith("---")
      );

    if (lines.length === 0) {
      return res.status(400).json({
        message: "GPT 응답에서 유효한 음식 정보를 찾을 수 없습니다.",
        raw: responseText,
      });
    }

    const [name, kcal, sodium, sugar, protein] = lines[0]
      .split("|")
      .map((s) => s.trim());

    const foodData = {
      name,
      energy: parseFloat(kcal),
      sodium: parseFloat(sodium),
      sugar: parseFloat(sugar),
      protein: parseFloat(protein),
    };

    const added = await prisma.dietLogFoodInfo.create({
      data: {
        dietLogId: Number(logId),
        ...foodData,
      },
    });

    res.status(201).json({ message: "음식 추가 성공 (OpenAI 추정)", added });
  } catch (err) {
    console.error("음식 추가 실패:", err);
    res
      .status(500)
      .json({ message: "서버 오류로 인해 음식 추가 실패", error: err.message });
  }
};

export const getAllDietLogs = async (req, res) => {
  const userId = req.user.userId;

  try {
    const logs = await prisma.userDietLog.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      include: {
        foods: {
          include: {
            food: true,
          },
        },
      },
    });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "식단 조회 실패" });
  }
};

export const getDietLogDetail = async (req, res) => {
  const { logId } = req.params;

  try {
    const log = await prisma.userDietLog.findUnique({
      where: { id: Number(logId) },
      include: {
        foods: {
          include: {
            food: true,
          },
        },
      },
    });
    if (!log) return res.status(404).json({ message: "식단 없음" });

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: "식단 상세 조회 실패" });
  }
};

export const removeFoodFromLog = async (req, res) => {
  const { logId, foodId } = req.params;

  try {
    const deleted = await prisma.dietLogFood.deleteMany({
      where: {
        logId: Number(logId),
        foodId: Number(foodId),
      },
    });
    res.status(200).json({ message: "삭제됨", deleted });
  } catch (err) {
    res.status(500).json({ message: "삭제 실패" });
  }
};

export const getDietLogsByDate = async (req, res) => {
  const userId = req.user.userId;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "날짜가 필요합니다." });
  }

  try {
    const logs = await prisma.userDietLog.findMany({
      where: {
        userId,
        date: new Date(date),
      },
      include: {
        foods: {
          include: {
            food: true,
          },
        },
        dietLogFoodInfo: true,
      },
    });

    const categorized = {
      breakfast: null,
      lunch: null,
      dinner: null,
    };

    logs.forEach((log) => {
      const key = log.mealType.toLowerCase();
      if (categorized.hasOwnProperty(key)) {
        const total = {
          energy: 0,
          sodium: 0,
          sugar: 0,
          protein: 0,
        };

        const foodInfos = log.dietLogFoodInfo.map((food) => {
          total.energy += food.energy || 0;
          total.sodium += food.sodium || 0;
          total.sugar += food.sugar || 0;
          total.protein += food.protein || 0;
          return {
            name: food.name,
            energy: food.energy,
            sodium: food.sodium,
            sugar: food.sugar,
            protein: food.protein,
          };
        });

        categorized[key] = {
          id: log.id,
          mealType: log.mealType,
          notes: log.notes,
          createdAt: log.createdAt,
          nutritionTotal: total,
          foodInfos,
        };
      }
    });

    res.status(200).json({ date, logs: categorized });
  } catch (err) {
    res
      .status(500)
      .json({ message: "날짜별 식단 조회 실패", error: err.message });
  }
};
