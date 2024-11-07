"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  setHours,
  setMinutes,
} from "date-fns";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { TimePickerModal } from "./time-picker-modal";
import { MatchScoringModal } from "./match-scoring-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarProps {
  events: any[];
  isEditing: boolean;
  onMatchScheduled: (match: any, date: Date) => void;
  onMatchScored?: (matchId: string, scores: any) => void;
}

export function Calendar({
  events,
  isEditing,
  onMatchScheduled,
  onMatchScored,
}: CalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [timePickerState, setTimePickerState] = useState<{
    isOpen: boolean;
    match: any;
    date: Date | null;
  }>({
    isOpen: false,
    match: null,
    date: null,
  });

  const [scoringState, setScoringState] = useState<{
    isOpen: boolean;
    match: any;
  }>({
    isOpen: false,
    match: null,
  });

  const [{ isOver }, drop] = useDrop({
    accept: "match",
    hover: (item, monitor) => {
      const calendar = calendarRef.current;
      if (!calendar) return;

      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const cells = calendar.querySelectorAll(".rbc-day-bg");
        cells.forEach((cell) => {
          cell.classList.remove("bg-white/10");
          const rect = cell.getBoundingClientRect();
          if (
            clientOffset.x >= rect.left &&
            clientOffset.x <= rect.right &&
            clientOffset.y >= rect.top &&
            clientOffset.y <= rect.bottom
          ) {
            cell.classList.add("bg-white/10");
          }
        });
      }
    },
    drop: (item: any, monitor) => {
      const calendar = calendarRef.current;
      if (!calendar || !isEditing) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const cells = calendar.querySelectorAll(".rbc-day-bg");
      let droppedDate: Date | null = null;

      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        if (
          clientOffset.x >= rect.left &&
          clientOffset.x <= rect.right &&
          clientOffset.y >= rect.top &&
          clientOffset.y <= rect.bottom
        ) {
          // Get the date from the cell's data attribute
          const dateAttr = cell.getAttribute("data-date");
          if (dateAttr) {
            droppedDate = new Date(dateAttr);
          }
        }
        cell.classList.remove("bg-white/10");
      });

      if (droppedDate) {
        setTimePickerState({
          isOpen: true,
          match: item,
          date: droppedDate,
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleEventClick = (event: any) => {
    if (!isEditing && !event.isScored) {
      setScoringState({
        isOpen: true,
        match: event,
      });
    }
  };

  const handleScoreSubmit = (scores: any) => {
    if (scoringState.match && onMatchScored) {
      onMatchScored(scoringState.match.id, scores);
    }
  };

  useEffect(() => {
    if (!isOver && calendarRef.current) {
      const cells = calendarRef.current.querySelectorAll(".rbc-day-bg");
      cells.forEach((cell) => cell.classList.remove("bg-white/10"));
    }
  }, [isOver]);

  const handleTimeSelected = (hours: number, minutes: number) => {
    if (timePickerState.date && timePickerState.match) {
      const scheduledDate = setMinutes(
        setHours(timePickerState.date, hours),
        minutes
      );
      onMatchScheduled(timePickerState.match, scheduledDate);
      setTimePickerState({ isOpen: false, match: null, date: null });
    }
  };

  // Custom components for BigCalendar
  const components = {
    dateCellWrapper: (props: any) => {
      const { children, value } = props;
      return React.cloneElement(children, {
        'data-date': value.toISOString(),
      });
    },
  };

  return (
    <>
      <div
        ref={(node) => {
          drop(node);
          if (node) {
            calendarRef.current = node;
          }
        }}
        className={cn(
          "h-[calc(100vh-12rem)] bg-white/5 rounded-lg p-4",
          isEditing && "cursor-copy",
          isOver && "ring-2 ring-blue-500/50"
        )}
      >
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={["month", "week", "day"]}
          defaultView="month"
          selectable={isEditing}
          className="calendar-dark"
          tooltipAccessor={(event) => event.title}
          onSelectEvent={handleEventClick}
          components={components}
          eventPropGetter={(event) => ({
            className: cn(
              "transition-colors",
              event.isScored
                ? "bg-green-600 border-green-700"
                : "bg-blue-600 border-blue-700"
            ),
          })}
        />
      </div>

      <TimePickerModal
        open={timePickerState.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setTimePickerState({ isOpen: false, match: null, date: null });
          }
        }}
        onTimeSelected={handleTimeSelected}
        match={timePickerState.match}
        date={timePickerState.date}
      />

      <MatchScoringModal
        open={scoringState.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setScoringState({ isOpen: false, match: null });
          }
        }}
        match={scoringState.match}
        onScoreSubmit={handleScoreSubmit}
      />
    </>
  );
}