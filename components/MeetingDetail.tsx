"use client";

import type { SacramentMeeting } from "../lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Hymn({ number, title }: { number: number; title: string }) {
  return <p className="text-slate-700">#{number} &middot; {title}</p>;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const speakers = meeting.speakers.filter((item) => item.type === "speaker");
  const musicalNumbers = meeting.speakers.filter((item) => item.type === "musical-number");

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10 print:shadow-none">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Cedar Hills Ward</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Sacrament Meeting Program</h1>
          <p className="mt-2 text-slate-500">{new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date(`${meeting.date}T12:00:00`))}</p>
        </div>
        <button onClick={() => window.print()} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 print:hidden">
          Print program
        </button>
      </div>

      <div className="grid gap-3 border-b border-slate-200 py-6 sm:grid-cols-2">
        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section>
          <h2 className="section-title">Announcements</h2>
          {meeting.announcements?.length ? <ul className="list-disc space-y-1 pl-5 text-slate-700">{meeting.announcements.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="text-slate-500">None</p>}
        </section>
        <section>
          <h2 className="section-title">Opening hymn</h2>
          <Hymn {...meeting.openingHymn} />
        </section>
        <section>
          <h2 className="section-title">Opening prayer</h2>
          <p className="text-slate-700">{meeting.openingPrayer}</p>
        </section>
        <section>
          <h2 className="section-title">Ward business</h2>
          {meeting.wardBusiness.length ? <ul className="list-disc space-y-1 pl-5 text-slate-700">{meeting.wardBusiness.map((item) => <li key={item.description}>{item.description}</li>)}</ul> : <p className="text-slate-500">None</p>}
        </section>
        <section>
          <h2 className="section-title">Stake business</h2>
          <p className="text-slate-700">{meeting.stakeBusiness ? "Yes" : "No"}</p>
        </section>
        <section>
          <h2 className="section-title">Sacrament hymn</h2>
          <Hymn {...meeting.sacramentHymn} />
        </section>
      </div>

      <section className="mt-8 border-t border-slate-200 pt-6">
        <h2 className="section-title">Speakers and musical numbers</h2>
        <div className="space-y-3">
          {speakers.map((item) => <p key={`${item.name}-${item.topic}`} className="text-slate-700"><strong>{item.name}</strong> &middot; {item.topic}</p>)}
          {musicalNumbers.map((item) => <p key={`${item.name}-${item.topic}`} className="text-slate-700"><strong>Musical number: {item.name}</strong>{item.topic ? ` · ${item.topic}` : ""}</p>)}
          {!meeting.speakers.length && <p className="text-slate-500">No speakers or musical numbers listed.</p>}
        </div>
      </section>

      <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
        <section>
          <h2 className="section-title">Closing hymn</h2>
          <Hymn {...meeting.closingHymn} />
        </section>
        <section>
          <h2 className="section-title">Closing prayer</h2>
          <p className="text-slate-700">{meeting.closingPrayer}</p>
        </section>
      </div>
    </article>
  );
}
