import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createHealthInfo(req, res) {
  const userId = req.user.userId;
  const {
    birthdate,
    gender,
    height,
    weight,
    diseaseName, // ✅ 질병명 입력 받기
    proteinLimit,
    sugarLimit,
    sodiumLimit,
    notes,
  } = req.body;

  try {
    // 1. 질병명으로 diseaseId 조회
    const disease = await prisma.disease.findFirst({
      where: { name: diseaseName },
    });

    if (!disease) {
      return res
        .status(404)
        .json({ message: "해당 질병명을 찾을 수 없습니다." });
    }

    // 2. 사용자 프로필 정보 업데이트
    await prisma.user.update({
      where: { id: userId },
      data: {
        birthdate: new Date(birthdate),
        gender: gender,
        height,
        weight,
      },
    });

    // 3. 사용자 건강정보 저장
    const diseaseInfo = await prisma.userDiseaseInfo.create({
      data: {
        userId,
        diseaseId: disease.id,
        proteinLimit,
        sugarLimit,
        sodiumLimit,
        notes,
      },
    });

    return res.status(201).json({
      message: "사용자 건강 정보 및 프로필 등록 완료",
      user: {
        id: userId,
        birthdate,
        gender,
      },
      diseaseInfo,
    });
  } catch (error) {
    console.error("건강정보 등록 실패:", error);
    return res.status(500).json({
      message: "서버 오류로 인해 정보를 등록할 수 없습니다.",
      error: error.message,
    });
  }
}

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
  const {
    diseaseName, // 👈 diseaseId 대신 이름을 받음
    proteinLimit,
    sugarLimit,
    sodiumLimit,
    notes,
  } = req.body;

  try {
    // 1. 질병명으로 disease 엔티티 조회
    const disease = await prisma.disease.findFirst({
      where: { name: diseaseName },
    });

    if (!disease) {
      return res.status(404).json({
        message: `"${diseaseName}" 질병명을 가진 데이터가 존재하지 않습니다.`,
      });
    }

    // 2. 기존 건강 정보 존재 여부 확인
    const existing = await prisma.userDiseaseInfo.findFirst({
      where: { userId, diseaseId: disease.id },
    });

    if (!existing) {
      return res.status(404).json({ message: "등록된 건강 정보가 없습니다." });
    }

    // 3. 업데이트 수행
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
    console.error("건강정보 수정 실패:", err);
    res.status(500).json({ message: "수정 실패" });
  }
};
