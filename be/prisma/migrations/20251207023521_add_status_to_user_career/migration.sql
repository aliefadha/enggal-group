-- CreateEnum
CREATE TYPE "CareerStatus" AS ENUM ('PENDING', 'INTERVIEW', 'HIRED', 'REJECT');

-- AlterTable
ALTER TABLE "UserCareer" ADD COLUMN     "status" "CareerStatus" NOT NULL DEFAULT 'PENDING';
