import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

const missionModules = import.meta.glob(
  "../data/games/**/mission_*/games.json",
  { eager: true },
);

export default function PookieCertificatePage() {
  const { completedMissions, xp } = useGameStore();
  const [recipientName, setRecipientName] = useState(
    () => localStorage.getItem("runai-recipient-name") || "Bestie Learner",
  );

  const summary = useMemo(() => {
    const totalMissions = Object.keys(missionModules).length;
    const completed = Object.values(completedMissions).reduce(
      (sum, missionList) => sum + missionList.length,
      0,
    );
    const completionRate = totalMissions
      ? Math.round((completed / totalMissions) * 100)
      : 0;
    const level = Math.floor(xp / 500) + 1;
    return { totalMissions, completed, completionRate, level };
  }, [completedMissions, xp]);

  const certificateId = useMemo(() => {
    const base = recipientName.replace(/\s+/g, "").toUpperCase().slice(0, 6) || "BESTIE";
    return `PK-${base}-${summary.completed}-${summary.level}`;
  }, [recipientName, summary.completed, summary.level]);

  const issuedOn = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNameChange = (value) => {
    setRecipientName(value);
    localStorage.setItem("runai-recipient-name", value);
  };

  return (
    <div className="min-h-screen bg-primary px-6 py-8 text-text">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border border-pink-300/20 bg-secondary/70 p-4">
          <label
            htmlFor="recipientName"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-dim"
          >
            Certificate Recipient
          </label>
          <input
            id="recipientName"
            value={recipientName}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Enter her name"
            className="w-full rounded-lg border border-pink-300/30 bg-primary/70 px-3 py-2 text-sm text-text outline-none transition focus:border-pink-300"
          />
        </div>

        <section className="rounded-3xl border border-pink-300/25 bg-gradient-to-br from-[#2d1d39] via-[#2a2848] to-[#18263d] p-8 md:p-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-200/80">
                Pookie Certificate
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-text md:text-4xl">
                Certificate of Learning Excellence
              </h1>
            </div>
            <img
              src="/mentee-logo.png"
              alt="MenteE logo"
              className="h-14 w-14 rounded-xl border border-pink-300/30 object-cover"
            />
          </div>

          <div className="rounded-2xl border border-pink-300/20 bg-primary/40 p-6">
            <p className="text-sm text-text-muted">This certificate is proudly awarded to</p>
            <p className="mt-2 text-3xl font-bold text-pink-200 md:text-4xl">
              {recipientName || "Bestie Learner"}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-text-muted">
              in recognition of outstanding dedication toward learning, consistent
              practice, and measurable growth across technical missions. This
              achievement reflects discipline, focus, and commitment to continuous
              improvement.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-pink-300/20 bg-pink-400/10 p-3">
                <p className="text-xs text-pink-200">Completed Missions</p>
                <p className="mt-1 text-lg font-semibold text-text">
                  {summary.completed} / {summary.totalMissions}
                </p>
              </div>
              <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 p-3">
                <p className="text-xs text-amber-200">Completion Rate</p>
                <p className="mt-1 text-lg font-semibold text-text">
                  {summary.completionRate}%
                </p>
              </div>
              <div className="rounded-xl border border-blue-300/20 bg-blue-400/10 p-3">
                <p className="text-xs text-blue-200">Current Level</p>
                <p className="mt-1 text-lg font-semibold text-text">Lvl {summary.level}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 text-xs text-text-dim md:grid-cols-3">
            <div>
              <p>Issued By</p>
              <p className="mt-1 text-sm font-semibold text-pink-200">MenteE</p>
            </div>
            <div>
              <p>Issued On</p>
              <p className="mt-1 text-sm font-semibold text-text">{issuedOn}</p>
            </div>
            <div>
              <p>Certificate ID</p>
              <p className="mt-1 text-sm font-semibold text-text">{certificateId}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/pookie"
            className="rounded-full border border-pink-300/35 bg-pink-400/15 px-4 py-2 text-xs font-semibold text-pink-200 transition hover:bg-pink-400/25"
          >
            Back To Pookie Page
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
