import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getMeetings } from "../../../lib/meetings-db";

export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  const date = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");
  const meeting = getMeetings(date)[0];

  redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
