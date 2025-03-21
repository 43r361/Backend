import { $Enums } from "@prisma/client";

export class EventModel {
	id: string;
	status: $Enums.EventStatus;
	htmlLink: string;
	summary: string;
	description?: string;
	location?: string;

	start: {
		// yyyy-mm-dd format if this is an all-day event
		date?: string;
		// rfc3339 format
		dateTime?: string;
		// requried unless specified on the dateTime (format is IANA ie. "Europe/Sofia")
		timeZone?: string;
	};

	end: {
		// yyyy-mm-dd format if this is an all-day event
		date?: string;
		// rfc3339 format
		dateTime?: string;
		// requried unless specified on the dateTime (format is IANA ie. "Europe/Sofia")
		timeZone?: string;
	};

	endTimeUnspecified: boolean;

	reminders: {
		useDefault: boolean;
		// overrides: [
		// 	{
		// 		method: string;
		// 		minutes: number;
		// 	},
		// ];
	};
}
