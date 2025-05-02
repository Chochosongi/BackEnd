import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 이미지 업로드 후 분석 요청 (분석은 모킹으로 처리)
export const uploadFoodImage = async (req, res) => {
  const userId = req.user.userId;
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const foodImage = await prisma.foodImage.create({
      data: {
        userId,
        imageUrl,
        status: "분석중",
      },
    });

    // [모킹] 분석 작업 수행 (AI 연동 대신 더미 데이터 생성)
    const mockDetectedFoods = [
      { foodId: 1, confidence: 0.91 },
      { foodId: 3, confidence: 0.82 },
    ];

    await Promise.all(
      mockDetectedFoods.map((item) =>
        prisma.detectedFood.create({
          data: {
            imageId: foodImage.id,
            foodId: item.foodId,
            confidence: item.confidence,
          },
        })
      )
    );

    await prisma.foodImage.update({
      where: { id: foodImage.id },
      data: {
        status: "완료",
        resultText: "사과, 닭가슴살이 감지됨",
      },
    });

    res.status(201).json({ imageId: foodImage.id, message: "분석 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "업로드 실패" });
  }
};

export const getImageAnalysisResult = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await prisma.foodImage.findUnique({
      where: { id: Number(id) },
      include: {
        detectedFoods: {
          include: { food: true },
        },
      },
    });

    if (!image) return res.status(404).json({ message: "이미지 없음" });

    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: "분석 결과 조회 실패" });
  }
};
