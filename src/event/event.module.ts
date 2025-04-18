import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { PrismaService } from "../prisma/prisma.service"; // Import the Prisma service

@Module({
	imports: [],
	controllers: [EventController],
	providers: [EventService, PrismaService], // Add the PrismaService as a provider
})
export class EventModule {}
