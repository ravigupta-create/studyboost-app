'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        Something went wrong
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
      >
        Try Again
      </button>
    </div>
  );
}
