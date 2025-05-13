import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDietLog = async (req, res) => {
  const userId = req.user.userId;
  const { date, mealType, notes } = req.body;

  if (!date || !mealType) {
    return res.status(400).json({ message: "날짜와 식사 종류는 필수입니다." });
  }

  try {
    const log = await prisma.userDietLog.create({
      data: {
        userId,
        date: new Date(date),
        mealType,
        notes,
      },
    });

    const foodNames = notes
      .split(/[,\s]+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    console.log(foodNames);

    const matchedFoods = await prisma.rawIngredient.findMany({
      where: {
        OR: foodNames.map((word) => ({
          name: {
            contains: word,
            mode: "insensitive",
          },
        })),
      },
      select: {
        id: true,
        name: true,
        sodium: true,
        protein: true,
        energy: true,
      },
    });

    console.log(matchedFoods);

    return res.status(201).json({
      message: "식단 추가 성공",
      dietLog: log,
      matchedFoods,
    });
  } catch (error) {
    console.error("식단 추가 실패:", error);
    return res
      .status(500)
      .json({ message: "서버 오류로 인해 식단을 추가할 수 없습니다." });
  }
};

export const addFoodToLog = async (req, res) => {
  const { logId } = req.params;
  const { foodId, amount } = req.body;

  try {
    const added = await prisma.dietLogFood.create({
      data: {
        logId: Number(logId),
        foodId,
        amount,
      },
    });
    res.status(201).json(added);
  } catch (err) {
    res.status(500).json({ message: "음식 추가 실패" });
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
