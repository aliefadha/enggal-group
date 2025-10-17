/*
  Warnings:

  - You are about to drop the column `whatsappUrl` on the `Brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "whatsappUrl";

-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "whatsappUrl" TEXT;
