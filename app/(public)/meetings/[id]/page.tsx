import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return (
    <main className="py-10">
      <Link href="/meetings" className="mb-6 inline-block text-sm font-semibold text-blue-700 hover:underline">
        &larr; Back to all meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
