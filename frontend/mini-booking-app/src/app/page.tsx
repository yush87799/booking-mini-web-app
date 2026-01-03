"use client";

import { useEffect, useMemo, useState } from "react";

type Slot = {
  id: string;
  date: string;
  time: string;
  booked: boolean;
  bookedBy?: string;
  bookedAt?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [booking, setBooking] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);

  async function loadSlots() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${API}/api/slots`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (e: any) {
      setMsg({ type: "error", text: "Failed to load slots. Please check if the backend is running." });
    } finally {
      setLoading(false);
    }
  }

  async function book(slotId: string) {
    if (!name.trim()) {
      setMsg({ type: "error", text: "Please enter your name to book a slot." });
      return;
    }

    setMsg(null);
    setBooking(slotId);
    try {
      const res = await fetch(`${API}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, customerName: name.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg({ type: "error", text: data?.error || "Booking failed. Please try again." });
        setBooking(null);
        return;
      }

      setMsg({ type: "success", text: `Successfully booked ${data.slot.date} at ${data.slot.time}!` });
      await loadSlots();
      setName("");
    } catch (e: any) {
      setMsg({ type: "error", text: "Network error. Please check your connection." });
    } finally {
      setBooking(null);
    }
  }

  useEffect(() => {
    loadSlots();
  }, []);

  // Group slots by date (including booked slots)
  const slotsByDate = useMemo(() => {
    const grouped: { [key: string]: Slot[] } = {};
    slots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  }, [slots]);

  const availableCount = useMemo(() => slots.filter((s) => !s.booked).length, [slots]);

  const formatDate = (dateStr: string) => {
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
  };

  // Calendar generation
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Start from the first Monday (or the 1st if it's Monday)
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday, go back 6 days to Monday
    startDate.setDate(firstDay.getDate() - daysToSubtract);
    
    // Generate 6 weeks (42 days)
    const days: Array<{ date: Date; dateStr: string; isCurrentMonth: boolean; isToday: boolean }> = [];
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
  }, [currentMonth]);

  const monthYearLabel = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

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

  const handleDateClick = (dateStr: string) => {
    if (slotsByDate[dateStr] && slotsByDate[dateStr].length > 0) {
      setSelectedDate(dateStr);
      setShowDayModal(true);
    }
  };

  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return [];
    return (slotsByDate[selectedDate] || []).sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, slotsByDate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            🏸 Elite Sports Court Booking
          </h1>
          <p className="mt-3 text-lg text-gray-600 sm:text-xl">
            Reserve your court time at our premium sports facility
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-lg">📍</span> Poornima University Jaipur
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🏟️</span> Indoor & Outdoor Courts
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">⏰</span> 7:00 AM - 6:00 PM
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">💰</span> ₹800/hour
            </span>
          </div>
        </div>

        {/* Name Input Card */}
        <div className="mx-auto mb-8 max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        {/* Message Alert */}
        {msg && (
          <div className="mx-auto mb-6 max-w-2xl">
            <div
              className={`rounded-xl p-4 ${
                msg.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2 text-xl">
                  {msg.type === "success" ? "✅" : "❌"}
                </span>
                <span className="font-medium">{msg.text}</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading court availability...</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">
            {/* Calendar */}
            <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-white hover:text-blue-600 transition-colors"
                    aria-label="Previous month"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{monthYearLabel}</h2>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-white hover:text-blue-600 transition-colors"
                    aria-label="Next month"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
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
                    const availableCount = daySlots.filter((s) => !s.booked).length;
                    const bookedCount = daySlots.filter((s) => s.booked).length;
                    const isMonday = day.date.getDay() === 1;
                    const isPast = day.date < new Date(new Date().setHours(0, 0, 0, 0));

                    return (
                      <div
                        key={idx}
                        onClick={() => !isMonday && !isPast && daySlots.length > 0 && handleDateClick(day.dateStr)}
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
                        <div className={`text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 ${day.isToday ? "text-blue-600" : day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
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
                  })}
                </div>
              </div>
            </div>

            {/* Info Text */}
            <div className="mt-4 text-center text-sm text-gray-600">
              Click on a date to view and book available time slots
            </div>
          </div>
        )}

        {/* Day Modal */}
        {showDayModal && selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pr-2">
                  {formatDate(selectedDate)}
                </h3>
                <button
                  onClick={() => {
                    setShowDayModal(false);
                    setSelectedDate(null);
                  }}
                  className="rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-white hover:text-red-600 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                {selectedDateSlots.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-base sm:text-lg text-gray-600">No slots available for this date</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                    {selectedDateSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`group relative rounded-lg sm:rounded-xl border-2 p-2 sm:p-3 md:p-4 text-center transition-all ${
                          slot.booked
                            ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-75"
                            : "border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 hover:shadow-md active:bg-blue-100"
                        }`}
                      >
                        {slot.booked ? (
                          <>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 line-through">
                              {slot.time}
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs font-medium text-red-600">
                              Booked
                            </div>
                            {slot.bookedBy && (
                              <div className="mt-1 text-[10px] sm:text-xs text-gray-500 truncate">
                                by {slot.bookedBy}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={async () => {
                              await book(slot.id);
                              // Modal will stay open so user can see the result
                            }}
                            disabled={booking === slot.id || !name.trim()}
                            className="w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
                          >
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                              {slot.time}
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs font-medium text-green-600">
                              Available
                            </div>
                            {booking === slot.id && (
                              <div className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-blue-500 bg-opacity-90">
                                <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Court Information Card */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Court Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📍 Location</h4>
                <p className="text-gray-600">Poornima University, Jaipur</p>
                <p className="text-sm text-gray-500 mt-1">Free parking available • On-campus facility</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">🏟️ Court Types</h4>
                <p className="text-gray-600">Indoor Hard Court • Outdoor Clay Court</p>
                <p className="text-sm text-gray-500 mt-1">Air-conditioned • Professional lighting</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">⚡ Amenities</h4>
                <p className="text-gray-600">Changing rooms • Equipment rental • Water station</p>
                <p className="text-sm text-gray-500 mt-1">Rackets, balls, and towels available</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📋 Booking Policy</h4>
                <p className="text-gray-600">1-hour slots • Cancellation 24h before</p>
                <p className="text-sm text-gray-500 mt-1">Monday: Closed for maintenance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        {!loading && slots.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={loadSlots}
              className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              Refresh Availability
            </button>
          </div>
        )}

        {/* Footer Attribution */}
        <footer className="mt-12 mb-8 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-gray-600 mb-3">
              Created by <span className="font-semibold text-gray-900">Pratyush Shrivastava</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/yush87799"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pratyush28/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
