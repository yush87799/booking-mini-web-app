import type { CalendarDay as CalendarDayType, Slot } from "@/types";
import CalendarDay from "./CalendarDay";

type CalendarGridProps = {
  calendarDays: CalendarDayType[];
  slotsByDate: { [key: string]: Slot[] };
  onDateClick: (dateStr: string) => void;
};

export default function CalendarGrid({ calendarDays, slotsByDate, onDateClick }: CalendarGridProps) {
  return (
    <div className="p-2 sm:p-3 md:p-4">
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-1 sm:py-2">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.substring(0, 1)}</span>
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
        {calendarDays.map((day, idx) => {
          const daySlots = slotsByDate[day.dateStr] || [];
          return <CalendarDay key={idx} day={day} daySlots={daySlots} onDateClick={onDateClick} />;
        })}
      </div>
    </div>
  );
}

