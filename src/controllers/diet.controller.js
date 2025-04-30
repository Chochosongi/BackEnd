import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDietLog = async (req, res) => {
  const userId = req.user.userId;
  const { date, mealType, notes } = req.body;

  try {
    const log = await prisma.userDietLog.create({
      data: {
        userId,
        date: new Date(date),
        mealType,
        notes,
      },
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "식단 생성 실패" });
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
