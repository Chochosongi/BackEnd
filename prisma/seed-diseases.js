import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedDiseases() {
  const diseases = [
    {
      name: "신장질환",
      description: "단백질과 나트륨 섭취를 제한해야 하는 질환입니다.",
    },
    {
      name: "당뇨병",
      description: "탄수화물과 당 섭취를 조절해야 하는 대사 질환입니다.",
    },
    {
      name: "고혈압",
      description: "나트륨 섭취를 제한하고 체중 관리를 필요로 하는 질환입니다.",
    },
    {
      name: "심장병",
      description: "지방과 나트륨을 줄이고 항산화 식단이 권장됩니다.",
    },
    {
      name: "갑상선 기능 저하증",
      description: "요오드 및 탄수화물 대사를 고려한 식단이 필요합니다.",
    },
  ];

  try {
    for (const disease of diseases) {
      await prisma.disease.create({ data: disease });
    }
    console.log("✅ 질병 더미 데이터 삽입 완료!");
  } catch (err) {
    console.error("❌ 오류 발생:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedDiseases();
