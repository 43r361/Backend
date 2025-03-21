import { $Enums, Event } from "@prisma/client";

export class EventEntity implements Event {
	/**
	 * The event's unique identifier.
	 */
	id: string;

	/**
	 * The event's unique identifier in the google calendar api.
	 */
	googleId: string;

	/**
	 * The event's status.
	 */
	status: $Enums.EventStatus;

	/**
	 * The event's html link for the google calendar web ui.
	 */
	htmlLink: string;

	/**
	 * The event's title.
	 */
	summary: string;

	/**
	 * The event's description.
	 */
	description: string;

	/**
	 * The event's location.
	 */
	location: string;

	/**
	 * The event's start date and time.
	 */
	startDateTime: Date;

	/**
	 * The event's start timezone.
	 */
	startTimeZone: string | null;

	/**
	 * The event's end date and time.
	 */
	endDateTime: Date | null;

	/**
	 * The event's end timezone.
	 */
	endTimeZone: string | null;

	/**
	 * Whether the event's start time is unspecified.
	 */
	endTimeUnspecified: boolean;

	/**
	 * The event calendar's unique identifier.
	 */
	calendarId: string;

	/**
	 * Whether the event uses the defaul reminders setting or has overrides.
	 */
	remindersUseDefault: boolean;
}
