import { Calendar } from "@prisma/client";

export class CalendarEntity implements Calendar {
	/**
	 * The calendar's unique identifier.
	 */
	id: string;

	/**
	 * The calendar's unique identifier in the google calendar api.
	 */
	googleId: string;

	/**
	 * The calendar's title.
	 */
	summary: string;

	/**
	 * The calendar's location.
	 */
	location: string;

	/**
	 * The calendar's timezone.
	 */
	timeZone: string;
}
