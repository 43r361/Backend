-- CreateTable
CREATE TABLE "Calendar" (
    "id" UUID NOT NULL,
    "summary" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "htmlLink" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "creatorId" UUID,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startDateTime" TIMESTAMP(3),
    "startTimeZone" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3),
    "endTimeZone" TEXT NOT NULL,
    "endTimeUnspecified" BOOLEAN NOT NULL,
    "calendarId" UUID NOT NULL,
    "remindersUseDefault" BOOLEAN NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "self" BOOLEAN NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_htmlLink_key" ON "Event"("htmlLink");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
