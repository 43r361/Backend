export interface CalendarFormat {
	id: string;
	summary: string;
	location: string;
	timeZone: string;
}

export interface EventFormat {}

/**
{
  "id": string,
  "status": string,
  "htmlLink": string,
  "summary": string,
  "description": string,
  "location": string,
  "creator": {
    "id": string,
    "email": string,
    "displayName": string,
    "self": boolean
  },                                     (might care if we share events)
  "start": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },
  "end": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },
  "endTimeUnspecified": boolean,
  "reminders": {
    "useDefault": boolean,
    "overrides": [
      {
        "method": string,
        "minutes": integer
      }
    ]
  }
}
*/
