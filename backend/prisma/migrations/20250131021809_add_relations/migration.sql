/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Cloud` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Guess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cloud_id_key" ON "Cloud"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guess_id_key" ON "Guess"("id");
