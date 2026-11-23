import Link from "next/link";
import { deleteMeeting } from "../lib/actions";
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
  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(`${meeting.date}T12:00:00`));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{formattedDate}</p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">
        <Link href={`/meetings/${meeting.id}`} className="hover:underline">
          {meetingTypeLabels[meeting.meetingType]}
        </Link>
      </h2>
      <p className="mt-4 text-sm text-slate-600">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-slate-600">Conducting: {meeting.conducting}</p>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting on ${formattedDate}`}
          className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Edit
        </Link>
        <form action={deleteMeetingWithId}>
          <button
            type="submit"
            aria-label={`Delete meeting on ${formattedDate}`}
            className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
