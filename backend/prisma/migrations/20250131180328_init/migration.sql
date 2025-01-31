/*
  Warnings:

  - Made the column `filter` on table `Guess` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guess" ALTER COLUMN "filter" SET NOT NULL;
