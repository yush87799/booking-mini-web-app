import type { Slot } from "@/types";

type TimeSlotProps = {
  slot: Slot;
  isBooking: boolean;
  customerName: string;
  onBook: (slotId: string) => void;
};

export default function TimeSlot({ slot, isBooking, customerName, onBook }: TimeSlotProps) {
  return (
    <div
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
          <div className="mt-1 sm:mt-2 text-xs font-medium text-red-600">Booked</div>
          {slot.bookedBy && (
            <div className="mt-1 text-[10px] sm:text-xs text-gray-500 truncate">
              by {slot.bookedBy}
            </div>
          )}
        </>
      ) : (
        <button
          onClick={async () => {
            await onBook(slot.id);
          }}
          disabled={isBooking || !customerName.trim()}
          className="w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
        >
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{slot.time}</div>
          <div className="mt-1 sm:mt-2 text-xs font-medium text-green-600">Available</div>
          {isBooking && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-blue-500 bg-opacity-90">
              <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </button>
      )}
    </div>
  );
}

