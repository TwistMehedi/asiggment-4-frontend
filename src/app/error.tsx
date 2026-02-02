"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 p-6 rounded-[2.5rem] mb-6">
        <AlertCircle size={64} className="text-red-500 animate-bounce" />
      </div>

      <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-500 max-w-md mb-8 font-medium">
        We encountered an unexpected error. Please try refreshing the page or
        contact support if the problem persists.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={() => reset()}
          className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95"
        >
          <RefreshCcw size={18} /> Try Again
        </button>

        <Link
          href="/"
          className="flex-1 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
        >
          <Home size={18} /> Go Home
        </Link>
      </div>

      <p className="mt-8 text-[10px] text-gray-300 font-mono">
        Error Digest: {error.digest}
      </p>
    </div>
  );
}
