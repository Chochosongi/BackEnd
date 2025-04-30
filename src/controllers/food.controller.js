import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchFoods = async (req, res) => {
  const { name } = req.query;

  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: {
            mode: "insensitive",
          },
        },
      },
      take: 20,
    });
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: "검색 실패" });
  }
};

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
