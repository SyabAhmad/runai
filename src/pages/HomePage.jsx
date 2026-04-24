import { Link } from "react-router-dom";

const missionModules = import.meta.glob(
  "../data/games/**/mission_*/games.json",
  { eager: true },
);

const formatName = (value) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default function HomePage() {
  const techSet = new Set();
  Object.keys(missionModules).forEach((path) => {
    const parts = path.split("/");
    const tech = parts[3];
    if (tech) techSet.add(tech);
  });
  const technologies = Array.from(techSet).sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen bg-primary text-text">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(244,114,182,0.2),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.16),transparent_36%)]" />
        <div className="pointer-events-none absolute -left-10 top-24 h-28 w-28 rounded-full border border-pink-300/20 bg-pink-400/10" />
        <div className="pointer-events-none absolute right-10 top-36 h-20 w-20 rounded-full border border-blue-300/20 bg-blue-400/10" />
        <div className="pointer-events-none absolute bottom-28 left-1/3 h-16 w-16 rounded-full border border-emerald-300/20 bg-emerald-400/10" />

        <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8">
          <header className="mb-10 flex items-center justify-between rounded-2xl border border-border bg-secondary/55 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img
                src="/mentee-logo.png"
                alt="MenteE logo"
                className="h-10 w-10 rounded-xl border border-pink-300/30 object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Bestie Learning Space</p>
                <p className="text-xs text-text-dim">Cute mode: ON</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="rounded-full border border-accent/35 bg-accent/15 px-4 py-2 text-xs font-semibold text-accent transition hover:bg-accent/25"
              >
                My Progress
              </Link>
            </div>
          </header>

          <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="h-full rounded-3xl border border-border bg-gradient-to-br from-[#1f2037] via-[#232740] to-[#17263c] p-8 shadow-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-300/80">
                  A Sweet Dedication
                </p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
                  Made by <span className="text-pink-300">MenteE</span> for his
                  Bestie
                  <br />
                  to learn quickly and touch the sky.
                </h1>
                <p className="mt-6 text-sm">
                  This whole page is for her growth journey. One mission at a
                  time, one win at a time, one proud smile at a time. Learn,
                  build, repeat.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-pink-300/20 bg-pink-400/10 p-3">
                  <img
                    src="/mentee-logo.png"
                    alt="MenteE logo"
                    className="h-12 w-12 rounded-lg border border-pink-300/30 object-cover"
                  />
                  <p className="text-xs text-pink-100">
                    Her learning mark by MenteE
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-pink-300/20 bg-pink-400/10 p-4">
                    <p className="text-xs text-pink-200">Step 1</p>
                    <p className="mt-1 text-sm font-semibold">Learn Fast</p>
                  </div>
                  <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4">
                    <p className="text-xs text-blue-200">Step 2</p>
                    <p className="mt-1 text-sm font-semibold">Practice Daily</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                    <p className="text-xs text-emerald-200">Step 3</p>
                    <p className="mt-1 text-sm font-semibold">Touch The Sky</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="h-full rounded-3xl border border-border bg-secondary/75 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-text-dim">
                  Cheer Notes
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-border bg-primary/50 p-4 text-sm text-text-muted">
                    You are capable of hard things.
                  </div>
                  <div className="rounded-xl border border-border bg-primary/50 p-4 text-sm text-text-muted">
                    Tiny progress is still progress.
                  </div>
                  <div className="rounded-xl border border-border bg-primary/50 p-4 text-sm text-text-muted">
                    Keep showing up. You are doing great.
                  </div>
                  <div className="rounded-xl border border-pink-300/30 bg-pink-400/10 p-4 text-sm font-medium text-pink-200">
                    Special mission: make her proud of herself.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
                Pick A Cute Track
              </h2>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                {technologies.length} tracks ready
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {technologies.map((tech, idx) => (
                <Link
                  key={tech}
                  to={`/${tech}`}
                  className={`group rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                    idx % 3 === 0
                      ? "border-pink-300/25 bg-pink-400/10 hover:border-pink-300/45"
                      : idx % 3 === 1
                        ? "border-blue-300/25 bg-blue-400/10 hover:border-blue-300/45"
                        : "border-emerald-300/25 bg-emerald-400/10 hover:border-emerald-300/45"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-text group-hover:text-white">
                      {formatName(tech)}
                    </p>
                    <svg
                      className="h-4 w-4 text-text-dim transition group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <p className="mt-2 text-xs text-text-muted">
                    Open this track and continue her journey.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <footer className="mt-10 rounded-2xl border border-border bg-secondary/40 px-5 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/mentee-logo.png"
                  alt="MenteE logo"
                  className="h-8 w-8 rounded-lg border border-border object-cover"
                />
                <p className="text-xs text-text-muted">
                  Crafted with care by{" "}
                  <span className="font-semibold text-pink-300">MenteE</span>{" "}
                  for his Bestie.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Link
                  to="/"
                  className="text-text-dim transition hover:text-text"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-text-dim transition hover:text-text"
                >
                  Profile
                </Link>
                <Link
                  to="/sql"
                  className="text-text-dim transition hover:text-text"
                >
                  SQL
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
