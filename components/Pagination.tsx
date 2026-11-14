"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-lg border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
        >
          Previous
        </Link>
      ) : <span />}
      <span className="text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-lg border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
        >
          Next
        </Link>
      ) : <span />}
    </nav>
  );
}
