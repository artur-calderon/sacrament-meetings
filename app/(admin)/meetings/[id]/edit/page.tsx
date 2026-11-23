import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  return (
    <main className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit meeting</h1>
      <MeetingForm action={updateMeetingWithId} meeting={meeting} submitLabel="Save changes" />
    </main>
  );
}
