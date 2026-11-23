"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MeetingsError({ error, reset }: { error: unknown; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-slate-600">We could not load or save the meetings right now.</p>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => reset()} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Try Again
        </button>
        <Link href="/meetings" className="rounded-lg px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50">
          Back to meetings
        </Link>
      </div>
    </main>
  );
}
