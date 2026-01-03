export default function Header() {
  return (
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
  );
}

