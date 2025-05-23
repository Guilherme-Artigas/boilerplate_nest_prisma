-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `responsibles` DROP FOREIGN KEY `responsibles_companyId_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `companyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `responsibles` MODIFY `companyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responsibles` ADD CONSTRAINT `responsibles_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
