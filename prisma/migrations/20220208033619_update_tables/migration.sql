/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_vehicleId_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "vehicleId",
ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
