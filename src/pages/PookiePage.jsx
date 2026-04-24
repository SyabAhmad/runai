import { Link } from "react-router-dom";

export default function PookiePage() {
  return (
    <div className="min-h-screen bg-primary px-6 py-8 text-text">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-3xl border border-pink-300/20 bg-gradient-to-br from-[#2a1c34] via-[#2a2848] to-[#17263c] p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
            Pookie Page
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
            A page for her <span className="text-pink-300">perfectness</span>,
            discipline, and growth.
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-pink-50/90">
            She stays focused, keeps standards high, and learns with intention.
            This page celebrates her consistency, sharp thinking, and the way
            she keeps moving forward every day.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-pink-300/20 bg-pink-400/10 p-5">
            <p className="text-xs text-pink-200">Strength 1</p>
            <p className="mt-2 text-sm font-semibold">Learns with focus</p>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-5">
            <p className="text-xs text-amber-200">Strength 2</p>
            <p className="mt-2 text-sm font-semibold">Shows up daily</p>
          </div>
          <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-5">
            <p className="text-xs text-blue-200">Strength 3</p>
            <p className="mt-2 text-sm font-semibold">
              Turns effort into results
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-pink-300/20 bg-secondary/70 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
            Bestie Notes
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>She keeps improving, even on difficult days.</li>
            <li>She treats learning like a real craft.</li>
            <li>She is building a strong future through steady practice.</li>
          </ul>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/pookie/certificate"
            className="rounded-full border border-pink-300/35 bg-pink-400/15 px-4 py-2 text-xs font-semibold text-pink-200 transition hover:bg-pink-400/25"
          >
            View Pookie Certificate
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-text-muted transition hover:text-text"
          >
            Back Home
          </Link>
          <Link
            to="/profile"
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-text-muted transition hover:text-text"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
