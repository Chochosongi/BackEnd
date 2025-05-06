import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertRawFoodsFromCSV(filePath) {
  //   await prisma.rawIngredient.create({
  //     data: {
  //       foodCode: "12345678",
  //       name: "테스트식품",
  //       origin: "국산",
  //       foodCategory: "곡류",
  //       midCategory: "쌀",
  //       subCategory: "백미",
  //       detailCategory: "찹쌀",
  //       energy: 300.0,
  //       protein: 5.2,
  //       fat: 1.0,
  //       carbohydrate: 65.0,
  //       sodium: 3.0,
  //       calcium: 10.0,
  //       iron: 2.0,
  //       vitaminA: 0.0,
  //       vitaminC: 0.0,
  //       cholesterol: 0.0,
  //       sourceName: "테스트출처",
  //       originCountry: "대한민국",
  //       originRegion: "경상북도",
  //     },
  //   });
  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath, { encoding: "utf8" })
      .pipe(csv({ mapHeaders: ({ header }) => header.replace(/^\uFEFF/, "") }))
      .on("data", (row) => {
        // if (Object.keys(row).length && !records.length) {
        //   console.log("🔍 첫 번째 row의 키 목록:", Object.keys(row));
        // }
        if (!row["식품코드"]) return;
        try {
          const record = {
            foodCode: row["식품코드"],
            name: row["식품명"],
            origin: row["식품기원명"],
            foodCategory: row["식품대분류명"],
            midCategory: row["식품중분류명"],
            subCategory: row["식품소분류명"],
            detailCategory: row["식품세분류명"],
            energy: parseFloat(row["에너지(kcal)"] || "0"),
            protein: parseFloat(row["단백질(g)"] || "0"),
            fat: parseFloat(row["지방(g)"] || "0"),
            carbohydrate: parseFloat(row["탄수화물(g)"] || "0"),
            sodium: parseFloat(row["나트륨(mg)"] || "0"),
            calcium: parseFloat(row["칼슘(mg)"] || "0"),
            iron: parseFloat(row["철(mg)"] || "0"),
            vitaminA: parseFloat(row["비타민 A(μg RAE)"] || "0"),
            vitaminC: parseFloat(row["비타민 C(mg)"] || "0"),
            cholesterol: parseFloat(row["콜레스테롤(mg)"] || "0"),
            sourceName: row["출처명"] || null,
            originCountry: row["원산지국명"] || null,
            originRegion: row["원산지역명"] || null,
          };
          console.log("레코드 준비됨:", record);
          records.push(record);
        } catch (err) {
          console.error("❌ DB 삽입 오류:", err, record);
        }
      })
      .on("end", async () => {
        let successCount = 0;
        for (const record of records) {
          try {
            await prisma.rawIngredient.create({ data: record });
            successCount++;
          } catch (err) {
            console.error("❌ DB 삽입 오류:", err.message, record);
          }
        }
        console.log(
          `📦 CSV 데이터 삽입 완료: ${filePath} (${successCount}개 성공)`
        );
        resolve();
      })
      .on("error", reject);
  });
}

async function main() {
  await insertRawFoodsFromCSV(
    "/Users/kanggyu/Downloads/농촌진흥청_국립식량과학원_통합식품영양성분정보(원재료성식품)_20250224.csv"
  );
  await insertRawFoodsFromCSV(
    "/Users/kanggyu/Downloads/해양수산부_국립수산과학원_통합식품영양성분정보(원재료성식품)_20250113.csv"
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
