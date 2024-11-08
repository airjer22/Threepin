"use client";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string) => format(date, formatStr.replace('n', 'N')),
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    id: 1,
    title: "Ironside vs Corinda",
    start: new Date(2024, 3, 15, 14, 0),
    end: new Date(2024, 3, 15, 15, 0),
    isCompleted: false,
  },
  {
    id: 2,
    title: "Graceville vs Indro",
    start: new Date(2024, 3, 17, 15, 30),
    end: new Date(2024, 3, 17, 16, 30),
    isCompleted: true,
    score: "3-2",
  },
];

export function TournamentCalendar() {
  return (
    <Card className="bg-white/10 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Tournament Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="calendar-dark"
            views={["month", "week", "day"]}
            defaultView="month"
            eventPropGetter={(event: any) => ({
              style: {
                backgroundColor: event.isCompleted ? '#22c55e' : '#2563eb',
                borderColor: event.isCompleted ? '#16a34a' : '#1d4ed8',
                color: 'white',
              },
            })}
            formats={{
              eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
                const timeStr = format(start, 'h:mm a');
                const matchEvent = events.find(e => 
                  e.start.getTime() === start.getTime() && 
                  e.end.getTime() === end.getTime()
                );
                return matchEvent?.isCompleted 
                  ? `${timeStr} - Final: ${matchEvent.score}`
                  : `${timeStr} - ${format(end, 'h:mm a')}`;
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}