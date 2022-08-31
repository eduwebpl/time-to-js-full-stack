/*
  Warnings:

  - You are about to alter the column `status` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Delivery_status")`.

*/
-- AlterTable
ALTER TABLE `Delivery` MODIFY `status` ENUM('IN_PROGRESS', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'IN_PROGRESS',
    MODIFY `address` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Restaurant` MODIFY `address` TEXT NOT NULL;
