import { useMemo, useState } from "react";
import type { Slot } from "@/types";
import { generateCalendarDays, getMonthYearLabel } from "@/utils/dateUtils";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

type CalendarProps = {
  slotsByDate: { [key: string]: Slot[] };
  onDateClick: (dateStr: string) => void;
};

export default function Calendar({ slotsByDate, onDateClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => generateCalendarDays(currentMonth), [currentMonth]);
  const monthYearLabel = getMonthYearLabel(currentMonth);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
        <CalendarHeader monthYearLabel={monthYearLabel} onNavigateMonth={navigateMonth} />
        <CalendarGrid calendarDays={calendarDays} slotsByDate={slotsByDate} onDateClick={onDateClick} />
      </div>
      {/* Info Text */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Click on a date to view and book available time slots
      </div>
    </div>
  );
}

