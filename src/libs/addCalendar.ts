import { openInNewTab } from './utils';

export interface IcsEvent {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

export function createICSFile({ title, description, location, start, end }: IcsEvent): string {
  const startDate = formatDateICS(start);
  const endDate = formatDateICS(end);

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR
  `.trim();

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  return URL.createObjectURL(blob);
}

function formatDateICS(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

export function downloadIcsFile(event: IcsEvent) {
  const icsUrl = createICSFile({
    title: event.title,
    description: event.description,
    location: event.location,
    start: event.start,
    end: event.end,
  });

  openInNewTab(icsUrl, `${event.title}.ics`);
  return icsUrl;
}
