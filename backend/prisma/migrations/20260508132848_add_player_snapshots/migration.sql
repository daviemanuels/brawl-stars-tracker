/*
  Warnings:

  - Added the required column `highestTrophies` to the `PlayerSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerSnapshot" ADD COLUMN     "highestTrophies" INTEGER NOT NULL;
