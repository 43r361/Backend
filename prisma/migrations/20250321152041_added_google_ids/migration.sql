/*
  Warnings:

  - The primary key for the `Reminder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[googleId]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId,calendarId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Reminder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "googleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "googleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_googleId_key" ON "Calendar"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_googleId_calendarId_key" ON "Event"("googleId", "calendarId");
