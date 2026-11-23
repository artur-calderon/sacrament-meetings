import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <main className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Create meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create meeting" />
    </main>
  );
}
