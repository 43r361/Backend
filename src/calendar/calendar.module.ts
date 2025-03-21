import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CalendarService } from "./calendar.service";
import { PrismaService } from "@prisma/prisma.service";

@Module({
	imports: [HttpModule, PrismaService], // Import the HttpModule here
	providers: [CalendarService],
})
export class CalendarModule {}
