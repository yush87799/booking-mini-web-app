export default function CourtInfo() {
  return (
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
  );
}

