"use client";

import { useState, useMemo, useEffect } from "react";
import { useSlots } from "@/hooks/useSlots";
import Header from "@/components/Header";
import NameInput from "@/components/NameInput";
import MessageAlert from "@/components/MessageAlert";
import LoadingSpinner from "@/components/LoadingSpinner";
import Calendar from "@/components/Calendar/Calendar";
import DayModal from "@/components/DayModal/DayModal";
import CourtInfo from "@/components/CourtInfo";
import Footer from "@/components/Footer";

export default function Home() {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);

  const { slots, loading, msg, booking, slotsByDate, loadSlots, bookSlot } = useSlots();

  // Clear name after successful booking
  useEffect(() => {
    if (msg?.type === "success") {
      setName("");
    }
  }, [msg]);

  const handleDateClick = (dateStr: string) => {
    if (slotsByDate[dateStr] && slotsByDate[dateStr].length > 0) {
      setSelectedDate(dateStr);
      setShowDayModal(true);
    }
  };

  const handleBook = async (slotId: string) => {
    await bookSlot(slotId, name);
  };

  const handleCloseModal = () => {
    setShowDayModal(false);
    setSelectedDate(null);
  };

  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slotsByDate[selectedDate] || [];
  }, [selectedDate, slotsByDate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header />

        <NameInput name={name} onNameChange={setName} />

        {msg && <MessageAlert msg={msg} />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Calendar slotsByDate={slotsByDate} onDateClick={handleDateClick} />
        )}

        {showDayModal && selectedDate && (
          <DayModal
            selectedDate={selectedDate}
            slots={selectedDateSlots}
            booking={booking}
            customerName={name}
            onClose={handleCloseModal}
            onBook={handleBook}
          />
        )}

        <CourtInfo />

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

        <Footer />
      </div>
    </main>
  );
}
