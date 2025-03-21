/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `startDateTime` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `method` on the `Reminder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('confirmed', 'tentative', 'cancelled');

-- CreateEnum
CREATE TYPE "ReminderMethod" AS ENUM ('email', 'popup');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_creatorId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "creatorId",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'confirmed',
ALTER COLUMN "startDateTime" SET NOT NULL,
ALTER COLUMN "startTimeZone" DROP NOT NULL,
ALTER COLUMN "endTimeZone" DROP NOT NULL,
ALTER COLUMN "endTimeUnspecified" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "method",
ADD COLUMN     "method" "ReminderMethod" NOT NULL;

-- DropTable
DROP TABLE "Creator";
