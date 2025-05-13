-- CreateTable
CREATE TABLE `DietLogFoodInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dietLogId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `energy` DOUBLE NULL,
    `sodium` DOUBLE NULL,
    `sugar` DOUBLE NULL,
    `protein` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `DietLogFoodInfo_dietLogId_idx`(`dietLogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DietLogFoodInfo` ADD CONSTRAINT `DietLogFoodInfo_dietLogId_fkey` FOREIGN KEY (`dietLogId`) REFERENCES `UserDietLog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
