import { Holiday, HolidayDate } from './types';

function getHolidayDateFromRawDate(rawDate: string): HolidayDate {
    const parts = rawDate.split('/');
    
    return {
        day: parseInt(parts[0]),
        month: parseInt(parts[1]),
    };
}

export default function parseRawHolidays(json: Array<{ date: string, name: string }>): Holiday[] {
    return json.map((rawHoliday) => ({
        date: getHolidayDateFromRawDate(rawHoliday.date),
        name: rawHoliday.name,
    }));
}
