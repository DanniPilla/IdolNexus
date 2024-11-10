"use client";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const onDateClick = (day) => {
    const eventTitle = prompt("Enter event title:");
    if (eventTitle) {
      setEvents({
        ...events,
        [format(day, "yyyy-MM-dd")]: eventTitle,
      });
    }
    setSelectedDate(day);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-blue-500 hover:text-blue-700"
      >
        Prev
      </button>
      <h2 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-blue-500 hover:text-blue-700"
      >
        Next
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium">
          {format(addDays(startDate, i), "EEEEEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        const event = events[formattedDate];

        days.push(
          <div
            key={day}
            className={`p-2 border rounded-lg ${
              isCurrentMonth ? "" : "bg-gray-100 text-gray-400"
            } ${isToday ? "bg-blue-200" : ""}`}
            onClick={() => onDateClick(day)}
          >
            <div className="text-center font-semibold">{format(day, "d")}</div>
            {event && <div className="text-xs text-blue-600 mt-1">{event}</div>}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
