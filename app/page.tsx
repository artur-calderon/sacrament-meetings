import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
      <div className="grid w-full items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Cedar Hills Ward</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">Plan and review Sunday meetings.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Find announcements, hymns, prayers, ward business, speakers, and musical numbers in one simple program!.
          </p>
          <Link href="/meetings/current" className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
            View current Sunday
          </Link>
        </div>
        <div className="rounded-3xl bg-blue-100 p-8">
          <Image src="/globe.svg" alt="Illustration of the world" width={320} height={320} className="mx-auto h-64 w-64 opacity-70" priority />
        </div>
      </div>
    </main>
  );
}
