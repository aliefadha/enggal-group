/*
  Warnings:

  - Added the required column `jenis_kelamin` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kota` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "jenis_kelamin" "Gender" NOT NULL,
ADD COLUMN     "kota" TEXT NOT NULL;
