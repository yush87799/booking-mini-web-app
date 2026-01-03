export default function LoadingSpinner() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl bg-white p-6 sm:p-8 md:p-12 text-center shadow-lg">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">Loading court availability...</p>
        <div className="mt-4 sm:mt-6 mx-auto max-w-2xl">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 sm:p-5 text-left">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">⏳</span>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold text-amber-900 mb-2">
                  Data is being fetched via Render
                </p>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  If the first request shows an error, please wait 1-2 minutes and refresh. The Render service uses a free tier that requires a cold start period (30-60 seconds) after inactivity. Once the service wakes up, it will fetch data properly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

