/*
  Warnings:

  - Added the required column `googleMapsLink` to the `Outlet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Outlet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "googleMapsLink" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;
