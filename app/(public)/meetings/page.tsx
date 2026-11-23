import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export const instant = false;

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main className="py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Meeting library</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Sacrament meetings</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Review current and past meeting programs for Cedar Hills Ward.</p>
      </div>
      <MeetingSearch />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
