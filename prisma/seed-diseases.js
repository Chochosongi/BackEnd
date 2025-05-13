import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedDiseases() {
  const diseases = [
    {
      name: "Phenylketonuria (PKU)",
      description:
        "Strictly limit phenylalanine intake; use medical formula for protein.",
      maxProteinPerDay: 10,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1500,
    },
    {
      name: "Maple Syrup Urine Disease (MSUD)",
      description:
        "Avoid BCAA-rich foods (leucine, isoleucine, valine); use metabolic formula.",
      maxProteinPerDay: 8,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1500,
    },
    {
      name: "Galactosemia",
      description:
        "Exclude all dairy, lactose, and galactose-containing foods; supplement calcium and vitamin D.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 25,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Homocystinuria",
      description:
        "Limit methionine intake; use low-protein foods and ensure vitamin B6/B12/folate.",
      maxProteinPerDay: 15,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Tyrosinemia Type I",
      description:
        "Restrict tyrosine and phenylalanine; avoid high-protein animal foods.",
      maxProteinPerDay: 12,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1500,
    },
    {
      name: "Tyrosinemia Type II",
      description:
        "Low-tyrosine and low-phenylalanine diet essential; use prescribed amino acid mix.",
      maxProteinPerDay: 15,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1600,
    },
    {
      name: "Tyrosinemia Type III",
      description:
        "Same dietary restrictions as Type I; ensure metabolic balance and monitor neurologic signs.",
      maxProteinPerDay: 18,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1700,
    },
    {
      name: "Isovaleric Acidemia",
      description:
        "Avoid leucine-rich foods such as dairy, meat, and legumes; use special formula for protein needs.",
      maxProteinPerDay: 10,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1500,
    },
    {
      name: "Propionic Acidemia",
      description:
        "Restrict intake of odd-chain amino acids (isoleucine, valine, methionine, threonine); avoid high-protein foods.",
      maxProteinPerDay: 8,
      maxSugarPerDay: 30,
      maxSodiumPerDay: 1400,
    },
    {
      name: "Methylmalonic Acidemia (MMA)",
      description:
        "Avoid precursors of propionyl-CoA; restrict animal proteins; use medical formula for nutrition.",
      maxProteinPerDay: 8,
      maxSugarPerDay: 30,
      maxSodiumPerDay: 1400,
    },
    {
      name: "Glutaric Acidemia Type I",
      description:
        "Restrict lysine and tryptophan; avoid high-protein foods such as meat and eggs.",
      maxProteinPerDay: 10,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1500,
    },
    {
      name: "Argininosuccinic Aciduria",
      description:
        "Limit total protein intake; ensure arginine supplementation; avoid fasting and high nitrogen load.",
      maxProteinPerDay: 10,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Citrullinemia Type I",
      description:
        "Restrict protein intake; avoid prolonged fasting; supplement with essential amino acids as needed.",
      maxProteinPerDay: 10,
      maxSugarPerDay: 30,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Citrullinemia Type II",
      description:
        "Limit protein intake moderately; avoid alcohol and fasting; maintain glucose availability.",
      maxProteinPerDay: 12,
      maxSugarPerDay: 30,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Ornithine Transcarbamylase (OTC) Deficiency",
      description:
        "Limit protein to reduce ammonia load; ensure adequate calorie intake; avoid fasting.",
      maxProteinPerDay: 8,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1600,
    },
    {
      name: "Carbamoyl Phosphate Synthetase I Deficiency",
      description:
        "Severe urea cycle defect; restrict protein strictly; frequent meals and glucose support essential.",
      maxProteinPerDay: 6,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1600,
    },
    {
      name: "Medium-Chain Acyl-CoA Dehydrogenase Deficiency (MCADD)",
      description:
        "Avoid fasting; provide regular carbohydrate intake to prevent hypoglycemia.",
      maxProteinPerDay: 50,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Very-Long-Chain Acyl-CoA Dehydrogenase Deficiency (VLCADD)",
      description:
        "Avoid long fasting and high-fat meals; frequent high-carb meals recommended.",
      maxProteinPerDay: 45,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Long-Chain 3-Hydroxyacyl-CoA Dehydrogenase Deficiency (LCHADD)",
      description:
        "Restrict long-chain fats; use medium-chain triglycerides (MCT); avoid fasting.",
      maxProteinPerDay: 40,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Short-Chain Acyl-CoA Dehydrogenase Deficiency (SCADD)",
      description:
        "Generally mild; maintain regular meals and stable glucose intake; fasting is discouraged.",
      maxProteinPerDay: 50,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Carnitine Transporter Deficiency",
      description:
        "Avoid fasting; high-carbohydrate, low-fat diet; carnitine supplementation required.",
      maxProteinPerDay: 50,
      maxSugarPerDay: 35,
      maxSodiumPerDay: 1700,
    },
    {
      name: "Carnitine Palmitoyltransferase I Deficiency",
      description:
        "Limit long-chain fats; provide medium-chain triglycerides; avoid fasting.",
      maxProteinPerDay: 45,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1700,
    },
    {
      name: "Carnitine Palmitoyltransferase II Deficiency",
      description:
        "Avoid prolonged fasting; high carbohydrate intake; supplement carnitine as needed.",
      maxProteinPerDay: 45,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1700,
    },
    {
      name: "Carnitine-Acylcarnitine Translocase Deficiency",
      description:
        "Restrict long-chain fats; use medium-chain triglycerides; avoid fasting.",
      maxProteinPerDay: 45,
      maxSugarPerDay: 40,
      maxSodiumPerDay: 1700,
    },
    {
      name: "Glycogen Storage Disease Type I",
      description:
        "Frequent meals with cornstarch; avoid fasting; maintain blood glucose levels.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 50,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Glycogen Storage Disease Type III",
      description:
        "High protein diet; frequent meals; avoid fasting; supplement cornstarch.",
      maxProteinPerDay: 70,
      maxSugarPerDay: 50,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Glycogen Storage Disease Type IV",
      description: "Manage symptoms; high carbohydrate intake; avoid fasting.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 50,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Glycogen Storage Disease Type VI",
      description:
        "Frequent meals; moderate protein and carbohydrate intake; avoid fasting.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 50,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Glycogen Storage Disease Type IX",
      description:
        "Balanced diet; frequent meals; avoid fasting; moderate protein intake.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 50,
      maxSodiumPerDay: 2000,
    },
    {
      name: "Fructose Intolerance",
      description:
        "Avoid fructose, sucrose, and sorbitol; maintain glucose intake.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 20,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Hereditary Fructose Intolerance",
      description:
        "Strictly avoid fructose and sucrose; monitor liver function.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 20,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Galactokinase Deficiency",
      description:
        "Avoid galactose-containing foods; monitor cataract development.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 25,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Classic Galactosemia",
      description:
        "Exclude galactose and lactose; supplement calcium and vitamin D.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 25,
      maxSodiumPerDay: 1800,
    },
    {
      name: "Smith-Lemli-Opitz Syndrome",
      description:
        "Supplement cholesterol; moderate fat and protein intake; avoid fasting and ensure consistent energy supply.",
      maxProteinPerDay: 60,
      maxSugarPerDay: 30,
      maxSodiumPerDay: 1800,
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
