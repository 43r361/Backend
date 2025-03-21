import { EventModel } from "./event.model";

export class EventListModel {
	// title of the calendar
	summary: string;
	// description of the calendar
	description: string;
	// timezone of the calendar
	timeZone: string;
	// defaultReminders: [
	// 	{
	// 		method: string;
	// 		minutes: number;
	// 	},
	// ];
	items: EventModel[];
}
