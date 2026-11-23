import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <main className="py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Meeting not found</h1>
      <p className="mt-3 text-slate-600">We could not find the meeting you are looking for.</p>
      <Link href="/meetings" className="mt-6 inline-block font-semibold text-blue-700 hover:underline">
        Back to all meetings
      </Link>
    </main>
  );
}
