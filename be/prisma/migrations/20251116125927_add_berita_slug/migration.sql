/*
  Warnings:

  - Added the required column `slug` to the `Berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinsi` to the `Outlet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Berita" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "provinsi" TEXT NOT NULL;
