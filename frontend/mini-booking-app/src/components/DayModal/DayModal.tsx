import { useMemo } from "react";
import type { Slot } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import TimeSlot from "./TimeSlot";

type DayModalProps = {
  selectedDate: string;
  slots: Slot[];
  booking: string | null;
  customerName: string;
  onClose: () => void;
  onBook: (slotId: string) => void;
};

export default function DayModal({
  selectedDate,
  slots,
  booking,
  customerName,
  onClose,
  onBook,
}: DayModalProps) {
  const selectedDateSlots = useMemo(() => {
    return slots.sort((a, b) => a.time.localeCompare(b.time));
  }, [slots]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pr-2">
            {formatDate(selectedDate)}
          </h3>
          <button
            onClick={onClose}
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
                <TimeSlot
                  key={slot.id}
                  slot={slot}
                  isBooking={booking === slot.id}
                  customerName={customerName}
                  onBook={onBook}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

