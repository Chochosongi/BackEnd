import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createHealthInfo = async (req, res) => {
  const userId = req.user.userId;
  const { diseaseId, proteinLimit, sugarLimit, sodiumLimit, notes } = req.body;

  try {
    const existing = await prisma.userDiseaseInfo.findFirst({
      where: { userId, diseaseId },
    });

    if (existing) {
      return res.status(409).json({ message: "이미 등록된 건강 정보입니다." });
    }

    const info = await prisma.userDiseaseInfo.create({
      data: {
        userId,
        diseaseId,
        proteinLimit,
        sugarLimit,
        sodiumLimit,
        notes,
      },
    });

    res.status(201).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "건강 정보 등록 실패" });
  }
};

export const getHealthInfo = async (req, res) => {
  const userId = req.user.userId;

  try {
    const data = await prisma.userDiseaseInfo.findMany({
      where: { userId },
      include: { disease: true },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "조회 실패" });
  }
};

export const updateHealthInfo = async (req, res) => {
  const userId = req.user.userId;
  const { diseaseId, proteinLimit, sugarLimit, sodiumLimit, notes } = req.body;

  try {
    const existing = await prisma.userDiseaseInfo.findFirst({
      where: { userId, diseaseId },
    });

    if (!existing) {
      return res.status(404).json({ message: "등록된 건강 정보가 없습니다." });
    }
    const updated = await prisma.userDiseaseInfo.update({
      where: { id: existing.id },
      data: {
        proteinLimit,
        sugarLimit,
        sodiumLimit,
        notes,
      },
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "수정 실패" });
  }
};
