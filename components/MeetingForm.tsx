"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { State } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  errors?: string[];
}

const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200";

function Field({ id, label, type = "text", defaultValue, errors }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">{label}</label>
      <input id={id} name={id} type={type} defaultValue={defaultValue} aria-describedby={`${id}-error`} className={inputClass} />
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        {errors?.map((error) => <p key={error} className="mt-1 text-sm text-red-700">{error}</p>)}
      </div>
    </div>
  );
}

const initialState: State = { message: null, errors: {} };

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="date" label="Date" type="date" defaultValue={meeting?.date} errors={state.errors?.date} />

        <div>
          <label htmlFor="meetingType" className="block text-sm font-semibold text-slate-800">Meeting type</label>
          <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? ""} aria-describedby="meetingType-error" className={inputClass}>
            <option value="" disabled>Select a type</option>
            <option value="regular">Regular sacrament meeting</option>
            <option value="testimony">Testimony meeting</option>
            <option value="stake">Stake meeting</option>
            <option value="general">General meeting</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.meetingType?.map((error) => <p key={error} className="mt-1 text-sm text-red-700">{error}</p>)}
          </div>
        </div>

        <Field id="presiding" label="Presiding" defaultValue={meeting?.presiding} errors={state.errors?.presiding} />
        <Field id="conducting" label="Conducting" defaultValue={meeting?.conducting} errors={state.errors?.conducting} />
        <Field id="openingHymnNumber" label="Opening hymn number" type="number" defaultValue={meeting?.openingHymn.number} errors={state.errors?.openingHymnNumber} />
        <Field id="openingHymnTitle" label="Opening hymn title" defaultValue={meeting?.openingHymn.title} errors={state.errors?.openingHymnTitle} />
        <Field id="openingPrayer" label="Opening prayer" defaultValue={meeting?.openingPrayer} errors={state.errors?.openingPrayer} />
        <Field id="closingPrayer" label="Closing prayer" defaultValue={meeting?.closingPrayer} errors={state.errors?.closingPrayer} />
        <Field id="sacramentHymnNumber" label="Sacrament hymn number" type="number" defaultValue={meeting?.sacramentHymn.number} errors={state.errors?.sacramentHymnNumber} />
        <Field id="sacramentHymnTitle" label="Sacrament hymn title" defaultValue={meeting?.sacramentHymn.title} errors={state.errors?.sacramentHymnTitle} />
        <Field id="closingHymnNumber" label="Closing hymn number" type="number" defaultValue={meeting?.closingHymn.number} errors={state.errors?.closingHymnNumber} />
        <Field id="closingHymnTitle" label="Closing hymn title" defaultValue={meeting?.closingHymn.title} errors={state.errors?.closingHymnTitle} />
      </div>

      <div>
        <label htmlFor="announcements" className="block text-sm font-semibold text-slate-800">Announcements (one per line)</label>
        <textarea id="announcements" name="announcements" rows={4} defaultValue={meeting?.announcements?.join("\n")} aria-describedby="announcements-error" className={inputClass} />
        <div id="announcements-error" aria-live="polite" aria-atomic="true">
          {state.errors?.announcements?.map((error) => <p key={error} className="mt-1 text-sm text-red-700">{error}</p>)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input id="stakeBusiness" name="stakeBusiness" type="checkbox" defaultChecked={meeting?.stakeBusiness} className="h-4 w-4" />
        <label htmlFor="stakeBusiness" className="text-sm font-semibold text-slate-800">Stake business</label>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.message && <p className="text-sm font-semibold text-red-700">{state.message}</p>}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={isPending} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link href="/meetings" className="rounded-lg px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Cancel</Link>
      </div>
    </form>
  );
}
