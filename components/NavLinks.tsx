
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/meetings", label: "All meetings" },
  { href: "/meetings/current", label: "Current Sunday" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Meeting navigation">
      {links.map((link) => {
        const active =
          link.href === "/meetings/current"
            ? pathname === link.href
            : pathname === "/meetings" ||
            (pathname.startsWith("/meetings/") &&
              pathname !== "/meetings/current");

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${active
              ? "bg-blue-700 text-white"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
