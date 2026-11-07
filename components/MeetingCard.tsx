import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<SacramentMeeting["meetingType"], string> = {
  testimony: "Testimony meeting",
  regular: "Regular sacrament meeting",
  stake: "Stake meeting",
  general: "General meeting",
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(`${meeting.date}T12:00:00`))}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{meetingTypeLabels[meeting.meetingType]}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">View</span>
      </div>
      <p className="mt-4 text-sm text-slate-600">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-slate-600">Conducting: {meeting.conducting}</p>
    </Link>
  );
}
