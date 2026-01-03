type CalendarHeaderProps = {
  monthYearLabel: string;
  onNavigateMonth: (direction: "prev" | "next") => void;
};

export default function CalendarHeader({ monthYearLabel, onNavigateMonth }: CalendarHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigateMonth("prev")}
          className="rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-white hover:text-blue-600 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{monthYearLabel}</h2>
        <button
          onClick={() => onNavigateMonth("next")}
          className="rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-white hover:text-blue-600 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

