import { Suspense } from "react";
import NavLinks from "../../components/NavLinks";

export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="border-b border-slate-200 py-5">
        <Suspense fallback={<div className="h-9" />}>
          <NavLinks />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
