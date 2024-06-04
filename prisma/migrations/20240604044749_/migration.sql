/*
  Warnings:

  - Added the required column `test_enum` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `test_enum` ENUM('KOREAN', 'JAPANESE', 'ENGLISH', 'VIETNAMESE') NOT NULL;
