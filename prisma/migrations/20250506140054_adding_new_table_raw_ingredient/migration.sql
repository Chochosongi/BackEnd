-- CreateTable
CREATE TABLE `RawIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `식품코드` VARCHAR(191) NOT NULL,
    `식품명` VARCHAR(191) NOT NULL,
    `식품기원명` VARCHAR(191) NOT NULL,
    `식품대분류명` VARCHAR(191) NOT NULL,
    `식품중분류명` VARCHAR(191) NOT NULL,
    `식품소분류명` VARCHAR(191) NOT NULL,
    `식품세분류명` VARCHAR(191) NOT NULL,
    `에너지(kcal)` DOUBLE NULL,
    `단백질(g)` DOUBLE NULL,
    `지방(g)` DOUBLE NULL,
    `탄수화물(g)` DOUBLE NULL,
    `나트륨(mg)` DOUBLE NULL,
    `칼슘(mg)` DOUBLE NULL,
    `철(mg)` DOUBLE NULL,
    `비타민 A(μg RAE)` DOUBLE NULL,
    `비타민 C(mg)` DOUBLE NULL,
    `콜레스테롤(mg)` DOUBLE NULL,
    `출처명` VARCHAR(191) NULL,
    `원산지국명` VARCHAR(191) NULL,
    `원산지역명` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
