/*
  Warnings:

  - Added the required column `time` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "vehicle" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
