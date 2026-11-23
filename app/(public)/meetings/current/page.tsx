import { connection } from "next/server";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetings } from "@/lib/meetings-db";

export const instant = false;

function upcomingSunday(from = new Date()) {
  const sunday = new Date(from);
  const daysUntilSunday = (7 - sunday.getDay()) % 7;
  sunday.setDate(sunday.getDate() + daysUntilSunday);
  return sunday;
}

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export default async function CurrentMeetingPage() {
  await connection();
  const date = formatDate(upcomingSunday());
  const [meeting] = await getMeetings(date);
  const label = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    new Date(`${date}T12:00:00`),
  );

  if (!meeting) {
    return (
      <main className="py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Current Sunday</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{label}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          No sacrament meeting program is available for this Sunday yet.
        </p>
      </main>
    );
  }

  return (
    <main className="py-10">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
