import MeetingCard from "../../components/MeetingCard";
import { headers } from "next/headers";
import type { SacramentMeeting } from "../../lib/types";

export const instant = false;

async function getMeetingsFromApi(): Promise<SacramentMeeting[]> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const response = await fetch(`${protocol}://${host}/api/meetings`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load meetings");
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await getMeetingsFromApi();

  return (
    <main className="py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Meeting library</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Sacrament meetings</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Review current and past meeting programs for Cedar Hills Ward.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
    </main>
  );
}
