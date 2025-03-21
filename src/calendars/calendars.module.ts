import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module";

import { CalendarsService } from "./calendars.service";

@Module({
	imports: [HttpModule, PrismaModule],
	providers: [CalendarsService],
	exports: [CalendarsService],
})
export class CalendarsModule {}
