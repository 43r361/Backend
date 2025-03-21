import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { firstValueFrom } from "rxjs"; // Use firstValueFrom to handle the observable

import { PrismaService } from "@prisma/prisma.service";

import { CalendarModel } from "./dto/models/calendar.model";
import { CalendarListModel } from "./dto/models/calendarList.model";
import { EventModel } from "./dto/models/event.model";
import { EventListModel } from "./dto/models/eventList.model";

@Injectable()
export class CalendarsService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly prisma: PrismaService
	) {}

	async getUserCalendars(accessToken: string): Promise<CalendarModel[]> {
		const url =
			"https://www.googleapis.com/calendar/v3/users/me/calendarList";
		try {
			const response = await firstValueFrom(
				this.httpService.get<CalendarListModel>(url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
			);

			return response.data.items;
		} catch (error: any) {
			throw new Error(`Failed to fetch user calendars: ${error.message}`);
		}
	}

	async getCalendarEvents(
		calendarId: string,
		accessToken: string
	): Promise<EventModel[]> {
		const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
		try {
			const response = await firstValueFrom(
				this.httpService.get<EventListModel>(url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
			);

			return response.data.items;
		} catch (error: any) {
			// no idea how to deal with errors
			throw new Error(
				`Failed to fetch calendar events: ${error.message}`
			);
		}
	}

	async saveCalendars(calendars: CalendarModel[], accessToken: string) {
		for (const calendar of calendars) {
			// skip the Bulgarian holidays calendar since it gives errors
			if (
				calendar.id ===
				"en.bulgarian#holiday@group.v.calendar.google.com"
			) {
				continue;
			}

			// Create the calendar entry
			await this.prisma.calendar.create({
				data: {
					googleId: calendar.id,
					summary: calendar.summary,
					location: calendar.location || "", // If location is missing, set to empty string
					timeZone: calendar.timeZone || "", // Handle missing timeZone similarly
					events: {
						create: await this.mapEvents(calendar.id, accessToken), // You would need to fetch the events for each calendar
					},
				},
			});
		}
	}

	private async mapEvents(
		calendarId: string,
		accessToken: string
	): Promise<Omit<Prisma.EventCreateInput, "calendarId" | "calendar">[]> {
		const eventsResponse = await this.getCalendarEvents(
			calendarId,
			accessToken
		);

		return eventsResponse.map(event => ({
			googleId: event.id,
			status: event.status,
			htmlLink: event.htmlLink,
			summary: event.summary,
			description: event.description || "",
			location: event.location || "",
			startDateTime: event.start.dateTime
				? new Date(event.start.dateTime)
				: event.start.date
					? new Date(event.start.date)
					: // this case is impossible, but TypeScript doesn't know that
						new Date(),
			startTimeZone: event.start.timeZone || null,
			endDateTime: event.end.dateTime
				? new Date(event.end.dateTime)
				: event.end.date
					? new Date(event.end.date)
					: null,
			endTimeZone: event.end.timeZone || null,
			endTimeUnspecified: event.endTimeUnspecified,
			remindersUseDefault: event.reminders.useDefault,
		}));
	}
}
