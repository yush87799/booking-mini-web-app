import type { CalendarDay } from "@/types";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${monthDay}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow, ${monthDay}`;
  }
  return `${dayName}, ${monthDay}`;
}

export function generateCalendarDays(currentMonth: Date): CalendarDay[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);

  // Start from the first Monday (or the 1st if it's Monday)
  const startDate = new Date(firstDay);
  const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday, go back 6 days to Monday
  startDate.setDate(firstDay.getDate() - daysToSubtract);

  // Generate 6 weeks (42 days)
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const isCurrentMonth = date.getMonth() === month;
    const dateForToday = new Date(date);
    dateForToday.setHours(0, 0, 0, 0);
    const isToday = dateForToday.toDateString() === today.toDateString();

    days.push({ date, dateStr, isCurrentMonth, isToday });
  }

  return days;
}

export function getMonthYearLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

