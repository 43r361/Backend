import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; // Import Prisma Service
import { EventModel } from "../calendars/dto/models/event.model"; // Import your EventModel DTO

@Injectable()
export class EventService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllEvent(): Promise<EventModel[]> {
		// Fetch all events from the database
		const events = await this.prisma.event.findMany();

		if (!events || events.length === 0) {
			throw new NotFoundException(`No events found`);
		}

		// Format the events to match the EventModel
		return events.map(event => {
			const start = this.formatDate(
				event.startDateTime,
				event.startTimeZone || "UTC"
			);
			const end = event.endDateTime
				? this.formatDate(event.endDateTime, event.endTimeZone || "UTC")
				: { date: undefined, dateTime: undefined, timeZone: undefined };

			return {
				id: event.id,
				status: event.status,
				htmlLink: event.htmlLink,
				summary: event.summary,
				description: event.description,
				location: event.location,
				start: start,
				end: end,
				endTimeUnspecified: event.endTimeUnspecified,
				reminders: {
					useDefault: event.remindersUseDefault,
				},
			};
		});
	}
	async getEventsForUser(userId: string): Promise<EventModel[]> {
		// Fetch the user's calendar using the googleId (you'll need to modify if you are using userId directly)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found`);
		}

		// Don't know how to get all the calendars

		// Fetch all events for the user's calendar
		const events = await this.prisma.event.findMany({
			where: { googleId: user.googleId },
			// include: {
			// 	calendar: true, // You can optionally include calendar data if needed
			// },
		});

		if (!events || events.length === 0) {
			throw new NotFoundException(
				`No events found for user with id ${userId}`
			);
		}

		return events.map(event => {
			const start = this.formatDate(
				event.startDateTime,
				event.startTimeZone || "UTC"
			);
			const end = event.endDateTime
				? this.formatDate(event.endDateTime, event.endTimeZone || "UTC")
				: { date: undefined, dateTime: undefined, timeZone: undefined };

			return {
				id: event.id,
				status: event.status,
				htmlLink: event.htmlLink,
				summary: event.summary,
				description: event.description,
				location: event.location,
				start: start,
				end: end,
				endTimeUnspecified: event.endTimeUnspecified,
				reminders: {
					useDefault: event.remindersUseDefault,
				},
			};
		});
		// Format the events to match the EventModel
	}

	// async getEventById(id: string): Promise<EventModel> {
	// 	const event = await this.prisma.event.findUnique({
	// 		where: { id },
	// 		// include: {
	// 		// 	calendar: true, // Optionally include the related calendar data
	// 		// },
	// 	});

	// 	if (!event) {
	// 		throw new NotFoundException(`Event with id ${id} not found`);
	// 	}

	// 	const start = this.formatDate(
	// 		event.startDateTime,
	// 		event.startTimeZone || "UTC"
	// 	);
	// 	const end = event.endDateTime
	// 		? this.formatDate(event.endDateTime, event.endTimeZone || "UTC")
	// 		: { date: undefined, dateTime: undefined, timeZone: undefined };

	// 	return {
	// 		id: event.id,
	// 		status: event.status,
	// 		htmlLink: event.htmlLink,
	// 		summary: event.summary,
	// 		description: event.description,
	// 		location: event.location,
	// 		start: start,
	// 		end: end,
	// 		endTimeUnspecified: event.endTimeUnspecified,
	// 		reminders: {
	// 			useDefault: event.remindersUseDefault,
	// 		},
	// 	};
	// }

	private formatDate(dateTime: Date, timeZone?: string) {
		const dateObj = new Date(dateTime);

		const isAllDayEvent =
			dateObj.toISOString().split("T")[1] === "00:00:00.000Z"; // Check if it's an all-day event (midnight)

		if (isAllDayEvent) {
			// For all-day events, return only the date in YYYY-MM-DD format
			return {
				date: dateObj.toISOString().split("T")[0],
				timeZone: timeZone || "UTC",
			};
		} else {
			// For date-time events, return the full RFC3339 format with time
			return {
				dateTime: dateObj.toISOString(),
				timeZone: timeZone || "UTC",
			};
		}
	}
}
