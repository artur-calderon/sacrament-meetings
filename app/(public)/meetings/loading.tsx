export default function MeetingsLoading() {
  return (
    <main className="animate-pulse py-10">
      <div className="mb-8 h-10 w-2/3 rounded bg-slate-200" />
      <div className="grid gap-5 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-48 rounded-2xl bg-slate-200" />
        ))}
      </div>
    </main>
  );
}
