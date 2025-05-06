/*
  Warnings:

  - You are about to drop the column `비타민 A(μg RAE)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `식품세분류명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `식품소분류명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `식품중분류명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `원산지국명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `원산지역명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `출처명` on the `RawIngredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RawIngredient` DROP COLUMN `비타민 A(μg RAE)`,
    DROP COLUMN `식품세분류명`,
    DROP COLUMN `식품소분류명`,
    DROP COLUMN `식품중분류명`,
    DROP COLUMN `원산지국명`,
    DROP COLUMN `원산지역명`,
    DROP COLUMN `출처명`,
    ADD COLUMN `당류(g)` DOUBLE NULL,
    ADD COLUMN `대표식품명` VARCHAR(191) NULL,
    ADD COLUMN `데이터구분명` VARCHAR(191) NULL,
    ADD COLUMN `수분(g)` DOUBLE NULL,
    ADD COLUMN `식이섬유(g)` DOUBLE NULL,
    ADD COLUMN `인(mg)` DOUBLE NULL,
    ADD COLUMN `칼륨(mg)` DOUBLE NULL,
    ADD COLUMN `회분(g)` DOUBLE NULL,
    MODIFY `식품기원명` VARCHAR(191) NULL,
    MODIFY `식품대분류명` VARCHAR(191) NULL;
