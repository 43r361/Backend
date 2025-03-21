import { Controller, Get, Param } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventModel } from "../calendars/dto/models/event.model";

@Controller("events")
export class EventController {
	constructor(private readonly eventService: EventService) {}

	// @Get(":id")
	// async getEvent(@Param("id") id: string): Promise<EventModel> {
	// 	return this.eventService.getEventById(id);
	// }
	@Get("user/:userId")
	async getEventsForUser(
		@Param("userId") userId: string
	): Promise<EventModel[]> {
		return this.eventService.getEventsForUser(userId);
	}
}
