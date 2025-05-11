/*
  Warnings:

  - You are about to drop the column `당류(g)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `대표식품명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `데이터구분명` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `수분(g)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `식이섬유(g)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `인(mg)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `칼륨(mg)` on the `RawIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `회분(g)` on the `RawIngredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RawIngredient` DROP COLUMN `당류(g)`,
    DROP COLUMN `대표식품명`,
    DROP COLUMN `데이터구분명`,
    DROP COLUMN `수분(g)`,
    DROP COLUMN `식이섬유(g)`,
    DROP COLUMN `인(mg)`,
    DROP COLUMN `칼륨(mg)`,
    DROP COLUMN `회분(g)`,
    ADD COLUMN `비타민 A(μg RAE)` DOUBLE NULL,
    ADD COLUMN `식품세분류명` VARCHAR(191) NULL,
    ADD COLUMN `식품소분류명` VARCHAR(191) NULL,
    ADD COLUMN `식품중분류명` VARCHAR(191) NULL,
    ADD COLUMN `원산지국명` VARCHAR(191) NULL,
    ADD COLUMN `원산지역명` VARCHAR(191) NULL,
    ADD COLUMN `출처명` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `height` DOUBLE NULL,
    ADD COLUMN `weight` DOUBLE NULL;
