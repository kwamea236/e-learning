/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable

ALTER TABLE `User` RENAME COLUMN `firstname` TO `username`;