"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMeetings } from "../lib/meetings-db";

const links = [
  { href: "/meetings", label: "All meetings" },
  { href: "/meetings/current", label: "Current Sunday" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  const currentDate = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");
  const currentMeeting = getMeetings(currentDate)[0];

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Meeting navigation">
      {links.map((link) => {
        const isCurrentMeeting = currentMeeting && pathname === `/meetings/${currentMeeting.id}`;
        const active = link.href === "/meetings/current"
          ? pathname === link.href || isCurrentMeeting
          : pathname === link.href || (pathname.startsWith("/meetings/") && !isCurrentMeeting);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
