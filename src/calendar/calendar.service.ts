import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs"; // Use firstValueFrom to handle the observable
import { PrismaService } from "@prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CalendarService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly prisma: PrismaService
	) {}

	async getUserCalendars(accessToken: string): Promise<any> {
		const url =
			"https://www.googleapis.com/calendar/v3/users/me/calendarList";
		try {
			const response = await firstValueFrom(
				this.httpService.get(url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
			);

			return response.data;
		} catch (error: any) {
			throw new Error(`Failed to fetch user calendars: ${error.message}`);
		}
	}

	async getCalendarEvents(
		calendarId: string,
		accessToken: string
	): Promise<any> {
		const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
		try {
			const response = await firstValueFrom(
				this.httpService.get(url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
			);

			return response.data;
		} catch (error: any) {
			// no idea how to deal with errors
			throw new Error(
				`Failed to fetch calendar events: ${error.message}`
			);
		}
	}

	async saveCalendars(calendars: any[], accessToken: string): Promise<void> {
		for (const calendar of calendars) {
			// Create the calendar entry
			await this.prisma.calendar.create({
				data: {
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
	): Promise<Prisma.EventCreateInput[]> {
		const eventsResponse = await this.getCalendarEvents(
			calendarId,
			accessToken
		);

		return eventsResponse.data.items.map((event: any) => ({
			summary: event.summary || "",
			location: event.location || "",
			start: event.start.dateTime || event.start.date,
			end: event.end.dateTime || event.end.date,
		}));
	}
}
