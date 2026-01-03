import type { CalendarDay as CalendarDayType, Slot } from "@/types";

type CalendarDayProps = {
  day: CalendarDayType;
  daySlots: Slot[];
  onDateClick: (dateStr: string) => void;
};

export default function CalendarDay({ day, daySlots, onDateClick }: CalendarDayProps) {
  const availableCount = daySlots.filter((s) => !s.booked).length;
  const bookedCount = daySlots.filter((s) => s.booked).length;
  const isMonday = day.date.getDay() === 1;
  const isPast = day.date < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div
      onClick={() => !isMonday && !isPast && daySlots.length > 0 && onDateClick(day.dateStr)}
      className={`relative min-h-[60px] sm:min-h-[70px] md:min-h-[80px] rounded-lg border-2 p-1 sm:p-1.5 md:p-2 transition-all ${
        !day.isCurrentMonth
          ? "border-gray-100 bg-gray-50 opacity-50"
          : isMonday
          ? "border-red-200 bg-red-50 cursor-not-allowed"
          : isPast
          ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
          : daySlots.length > 0
          ? "border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer active:bg-blue-100"
          : "border-gray-100 bg-gray-50"
      } ${day.isToday ? "ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2" : ""}`}
    >
      <div
        className={`text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 ${
          day.isToday ? "text-blue-600" : day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {day.date.getDate()}
      </div>
      {isMonday && (
        <div className="text-[10px] sm:text-xs text-red-600 font-medium leading-tight">Closed</div>
      )}
      {!isMonday && !isPast && daySlots.length > 0 && (
        <div className="space-y-0.5 sm:space-y-1">
          {availableCount > 0 && (
            <div className="text-[10px] sm:text-xs text-green-600 font-medium leading-tight">
              <span className="hidden sm:inline">{availableCount} avail</span>
              <span className="sm:hidden">{availableCount}</span>
            </div>
          )}
          {bookedCount > 0 && (
            <div className="text-[10px] sm:text-xs text-gray-500 leading-tight">
              <span className="hidden sm:inline">{bookedCount} booked</span>
              <span className="sm:hidden">{bookedCount}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

