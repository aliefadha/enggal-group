/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Berita` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
