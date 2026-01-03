import { useState, useEffect, useMemo } from "react";
import type { Slot, MessageType } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<MessageType | null>(null);
  const [booking, setBooking] = useState<string | null>(null);

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

  async function bookSlot(slotId: string, customerName: string) {
    if (!customerName.trim()) {
      setMsg({ type: "error", text: "Please enter your name to book a slot." });
      return;
    }

    setMsg(null);
    setBooking(slotId);
    try {
      const res = await fetch(`${API}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, customerName: customerName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg({ type: "error", text: data?.error || "Booking failed. Please try again." });
        setBooking(null);
        return;
      }

      setMsg({ type: "success", text: `Successfully booked ${data.slot.date} at ${data.slot.time}!` });
      await loadSlots();
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

  return {
    slots,
    loading,
    msg,
    booking,
    slotsByDate,
    availableCount,
    loadSlots,
    bookSlot,
    setMsg,
  };
}

