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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(244,114,182,0.22),transparent_32%),radial-gradient(circle_at_82%_14%,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.14),transparent_36%)]" />
        <div className="pointer-events-none absolute -left-10 top-24 h-28 w-28 rounded-full border border-pink-300/20 bg-pink-400/10 animate-pulse" />
        <div className="pointer-events-none absolute right-10 top-36 h-20 w-20 rounded-full border border-amber-300/20 bg-amber-400/10 animate-pulse" />
        <div className="pointer-events-none absolute bottom-28 left-1/3 h-16 w-16 rounded-full border border-blue-300/20 bg-blue-400/10 animate-pulse" />

        <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8">
          <header className="mb-10 flex items-center justify-between rounded-2xl border border-pink-300/20 bg-gradient-to-r from-secondary/80 via-[#1f223a]/85 to-secondary/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img
                src="/mentee-logo.png"
                alt="MenteE logo"
                className="h-10 w-10 rounded-xl border border-pink-300/30 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-pink-100">
                  Bestie Learning Space
                </p>
                <p className="text-xs text-pink-200/70">Pookie mode: ON</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="rounded-full border border-pink-300/40 bg-pink-400/15 px-4 py-2 text-xs font-semibold text-pink-200 transition hover:bg-pink-400/25"
              >
                My Progress
              </Link>
            </div>
          </header>

          <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="h-full rounded-3xl border border-pink-300/20 bg-gradient-to-br from-[#2a1c34] via-[#2a2848] to-[#17263c] p-8 shadow-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                  For My BESTIE
                </p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
                  Dedicated by <span className="text-pink-300">MenteE</span>
                  <br />
                  to his bestie's big goals,
                  <br />
                  sharp mind, and steady daily wins.
                </h1>
                <p className="mt-6 text-sm text-pink-50/90">
                  This page is about her consistency, her growth, her focus,
                  and her dedication toward learning. One mission, one level-up,
                  one more proof of her excellence.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-pink-300/30 bg-pink-400/10 p-3">
                  <img
                    src="/mentee-logo.png"
                    alt="MenteE logo"
                    className="h-12 w-12 rounded-lg border border-pink-300/30 object-cover"
                  />
                  <p className="text-xs text-pink-100">Pookie learner badge</p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-pink-300/20 bg-pink-400/10 p-4">
                    <p className="text-xs text-pink-200">Step 1</p>
                    <p className="mt-1 text-sm font-semibold">Clear Focus</p>
                  </div>
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4">
                    <p className="text-xs text-amber-200">Step 2</p>
                    <p className="mt-1 text-sm font-semibold">Daily Discipline</p>
                  </div>
                  <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4">
                    <p className="text-xs text-blue-200">Step 3</p>
                    <p className="mt-1 text-sm font-semibold">Top Results</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="h-full rounded-3xl border border-pink-300/20 bg-gradient-to-b from-secondary/80 to-[#1a1f33]/80 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/70">
                  Pocket Hype
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-pink-300/15 bg-primary/50 p-4 text-sm text-text-muted">
                    She learns fast, but she still respects the process.
                  </div>
                  <div className="rounded-xl border border-amber-300/15 bg-primary/50 p-4 text-sm text-text-muted">
                    Her consistency is her superpower.
                  </div>
                  <div className="rounded-xl border border-blue-300/15 bg-primary/50 p-4 text-sm text-text-muted">
                    Her standards are high, and she keeps leveling up.
                  </div>
                  <div className="rounded-xl border border-pink-300/30 bg-pink-400/10 p-4 text-sm font-medium text-pink-200">
                    Special mission: keep building the future she wants.
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
                  className={`group rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${
                    idx % 3 === 0
                      ? "border-pink-300/25 bg-gradient-to-br from-pink-400/10 to-pink-300/5 hover:border-pink-300/45"
                      : idx % 3 === 1
                        ? "border-amber-300/25 bg-gradient-to-br from-amber-400/10 to-amber-300/5 hover:border-amber-300/45"
                        : "border-blue-300/25 bg-gradient-to-br from-blue-400/10 to-blue-300/5 hover:border-blue-300/45"
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
                    Open this track and keep her sparkle going.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <footer className="mt-10 rounded-2xl border border-pink-300/20 bg-gradient-to-r from-secondary/65 via-[#1b2034]/70 to-secondary/65 px-5 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/mentee-logo.png"
                  alt="MenteE logo"
                  className="h-8 w-8 rounded-lg border border-border object-cover"
                />
                <p className="text-xs text-text-muted">
                  Crafted with care by{" "}
                  <a
                    href="https://syab.tech/mentee"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-pink-300 underline-offset-2 hover:underline"
                  >
                    MenteE
                  </a>{" "}
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
                  to="/pookie"
                  className="text-text-dim transition hover:text-text"
                >
                  Pookie
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

