/*
  Warnings:

  - Added the required column `alamat` to the `UserCareer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCareer" ADD COLUMN     "alamat" TEXT NOT NULL;
