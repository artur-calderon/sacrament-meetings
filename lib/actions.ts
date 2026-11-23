"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addMeeting, deleteMeeting as deleteMeetingFromDb, updateMeeting as updateMeetingInDb } from "./meetings-db";

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"], "Please choose a meeting type."),
  presiding: z.string().trim().min(1, "Presiding is required."),
  conducting: z.string().trim().min(1, "Conducting is required."),
  openingHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required."),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  sacramentHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
  sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required."),
  closingHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required."),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
  announcements: z.string(),
});

export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

function validateForm(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
    announcements: formData.get("announcements") ?? "",
  });
}

function toMeeting(data: z.infer<typeof MeetingFormSchema>, stakeBusiness: boolean) {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements.split("\n").map((line) => line.trim()).filter((line) => line !== ""),
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    stakeBusiness: stakeBusiness,
    sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const result = validateForm(formData);

  if (!result.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await addMeeting(toMeeting(result.data, formData.get("stakeBusiness") === "on"));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const result = validateForm(formData);

  if (!result.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await updateMeetingInDb(id, toMeeting(result.data, formData.get("stakeBusiness") === "on"));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(id: number) {
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the meeting. Please try again.");
  }

  revalidatePath("/meetings");
}
