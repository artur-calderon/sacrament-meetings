"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Header() {
  const dateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.textContent = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      }).format(new Date());
    }
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Cedar Hills Ward
        </Link>
        <p ref={dateRef} className="text-sm text-slate-500">Today</p>
      </div>
    </header>
  );
}
