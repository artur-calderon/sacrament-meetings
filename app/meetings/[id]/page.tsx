import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import type { SacramentMeeting } from "../../../lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const response = await fetch(`${protocol}://${host}/api/meetings/${id}`, { cache: "no-store" });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load meeting");
  }

  const meeting = await response.json() as SacramentMeeting;

  return (
    <main className="py-10">
      <Link href="/meetings" className="mb-6 inline-block text-sm font-semibold text-blue-700 hover:underline">
        &larr; Back to all meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
