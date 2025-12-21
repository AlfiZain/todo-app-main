'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col justify-center space-y-4 overflow-hidden rounded-md bg-Gray-50 px-6 py-8 shadow-xl dark:bg-Navy-900">
      <h2 className="text-center text-2xl dark:text-Gray-50">
        {error.message}
      </h2>
      <button
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Go Back
      </button>
    </main>
  );
}
