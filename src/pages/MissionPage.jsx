import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import GameRenderer from "../components/GameRenderer";
import { evaluateMission } from "../engine/evaluator";

const missionModules = import.meta.glob(
  "../data/games/**/mission_*/games.json",
  { eager: true },
);
const descriptionModules = import.meta.glob(
  "../data/games/**/mission_*/descriptions.json",
  { eager: true },
);
const hintModules = import.meta.glob("../data/games/**/mission_*/hints.json", {
  eager: true,
});
const guidelineModules = import.meta.glob(
  "../data/games/**/mission_*/guidelines.json",
  { eager: true },
);
const solutionModules = import.meta.glob(
  "../data/games/**/mission_*/solutions.json",
  { eager: true },
);

const getJsonModule = (modules, key) => {
  const mod = modules[key];
  if (!mod) return null;
  return mod.default ?? mod;
};

export default function MissionPage() {
  const { technology, chapter, mission: missionId } = useParams();
  const { completeMission, completedMissions } = useGameStore();
  const [mission, setMission] = useState(null);
  const [description, setDescription] = useState("");
  const [hints, setHints] = useState([]);
  const [guidelines, setGuidelines] = useState("");
  const [solution, setSolution] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [reaction, setReaction] = useState(null);
  const [reactionKey, setReactionKey] = useState(0);
  const chapterKey = `${technology}/${chapter}`;
  const isCompleted = (completedMissions[chapterKey] || []).includes(missionId);

  useEffect(() => {
    const basePath = `../data/games/${technology}/${chapter}/${missionId}`;
    const gamesPath = `${basePath}/games.json`;
    const descriptionsPath = `${basePath}/descriptions.json`;
    const hintsPath = `${basePath}/hints.json`;
    const guidelinesPath = `${basePath}/guidelines.json`;
    const solutionsPath = `${basePath}/solutions.json`;
    const hintProgressKey = `hintProgress:${technology}/${chapter}/${missionId}`;
    const solutionStorageKey = `missionSolution:${technology}/${chapter}/${missionId}`;
    const answerShownKey = `answerShown:${technology}/${chapter}/${missionId}`;

    const loadData = async () => {
      setResult(
        isCompleted
          ? { success: true, message: "Mission already completed." }
          : null,
      );
      setHintIndex(0);
      setShowAnswer(localStorage.getItem(answerShownKey) === "true");
      setUserInput("");
      try {
        const gamesData = getJsonModule(missionModules, gamesPath);
        if (!gamesData)
          throw new Error(
            `Missing games.json for ${technology}/${chapter}/${missionId}`,
          );
        setMission(gamesData);
        const savedSolution = localStorage.getItem(solutionStorageKey);
        setUserInput(savedSolution || gamesData.initialState?.content || "");

        try {
          const descs =
            getJsonModule(descriptionModules, descriptionsPath) || {};
          setDescription(descs[missionId] || "Complete the mission.");
        } catch {
          setDescription("Complete the mission.");
        }

        try {
          const allHints = getJsonModule(hintModules, hintsPath) || {};
          const missionHints = allHints[missionId] || [];
          setHints(missionHints);

          const savedHintIndex = Number(
            localStorage.getItem(hintProgressKey) || 0,
          );
          const safeHintIndex = Number.isFinite(savedHintIndex)
            ? Math.max(0, Math.min(savedHintIndex, missionHints.length))
            : 0;
          setHintIndex(safeHintIndex);
        } catch {
          setHints([]);
          setHintIndex(0);
        }

        try {
          const allGuidelines =
            getJsonModule(guidelineModules, guidelinesPath) || {};
          setGuidelines(allGuidelines[missionId] || "");
        } catch {
          setGuidelines("");
        }

        try {
          const allSolutions =
            getJsonModule(solutionModules, solutionsPath) || {};
          setSolution(allSolutions[missionId] || "");
        } catch {
          setSolution("");
        }
      } catch (error) {
        console.error("Failed to load mission data:", error);
        setMission({ id: missionId, type: "unknown" });
      }
    };

    loadData();
  }, [technology, chapter, missionId, isCompleted]);

  useEffect(() => {
    if (!reaction) return undefined;
    const timer = setTimeout(() => setReaction(null), 1600);
    return () => clearTimeout(timer);
  }, [reaction, reactionKey]);

  const handleSubmit = () => {
    if (!mission) return;
    if (isCompleted) return;
    const solutionStorageKey = `missionSolution:${technology}/${chapter}/${missionId}`;
    const evaluation = evaluateMission(mission, { content: userInput });
    if (evaluation.success) {
      completeMission(technology, chapter, missionId, mission.xpReward || 100);
      localStorage.setItem(solutionStorageKey, userInput);
      setResult({ success: true, message: evaluation.message });
      setReaction("success");
      setReactionKey(Date.now());
    } else {
      setResult({ success: false, message: evaluation.message });
      setReaction("error");
      setReactionKey(Date.now());
    }
  };

  const revealHint = () => {
    const hintProgressKey = `hintProgress:${technology}/${chapter}/${missionId}`;
    if (hintIndex < hints.length) {
      const nextHintIndex = hintIndex + 1;
      setHintIndex(nextHintIndex);
      localStorage.setItem(hintProgressKey, String(nextHintIndex));
    }
  };

  const handleShowAnswer = () => {
    const answerShownKey = `answerShown:${technology}/${chapter}/${missionId}`;
    setShowAnswer(true);
    localStorage.setItem(answerShownKey, "true");
  };

  // Check if mission is unlocked
  const isUnlocked = useGameStore
    .getState()
    .isUnlocked(technology, chapter, missionId);

  if (!mission)
    return (
      <div className="h-full flex items-center justify-center text-text-muted">
        Loading mission...
      </div>
    );

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-text-muted p-6">
        <svg
          className="w-16 h-16 mb-4 text-text-dim"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m0 0a9 9 0 10-9-9c1.153 0 2.24.275 3.193.765a6.985 6.985 0 01 4.197 4.197A9 9 0 01 12 21z"
          />
        </svg>
        <h2 className="text-xl font-bold text-text mb-2">Mission Locked</h2>
        <p className="text-sm mb-4">
          Complete the previous mission to unlock this one.
        </p>
        <Link to={`/${technology}/${chapter}`} className="btn btn-primary">
          Back to Missions
        </Link>
      </div>
    );
  }

  const displayChapter = chapter
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const displayMission = missionId
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {reaction === "success" && (
        <>
          <div className="confetti-wrap" aria-hidden>
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={`${reactionKey}-confetti-${index}`}
                className="confetti-piece"
                style={{
                  left: `${(index * 5.3) % 95}%`,
                  animationDelay: `${(index % 6) * 0.05}s`,
                }}
              />
            ))}
          </div>
          <div className="result-pop success">
            🎉 Party Time! Mission Cleared!
          </div>
        </>
      )}
      {reaction === "error" && (
        <div className="result-pop error">😢 Oops... not yet. Try again!</div>
      )}
      {/* Top bar with mission info */}
      <div className="px-6 py-4 border-b border-border bg-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text">
              {mission.title || displayMission}
            </h1>
            <p className="text-sm text-text-muted mt-1">
              {displayChapter} • {mission.type}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full">
              +{mission.xpReward || 100} XP
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                result?.success || isCompleted
                  ? "bg-success/20 text-success"
                  : result?.success === false
                    ? "bg-error/20 text-error"
                    : "bg-secondary text-text-dim"
              }`}
            >
              {result?.success || isCompleted
                ? "Completed"
                : result?.success === false
                  ? "Incorrect"
                  : "In Progress"}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Game Editor (2/3 width) */}
        <div className="flex-[2] flex flex-col overflow-hidden border-r border-border">
          <div className="flex-1 overflow-hidden">
            <GameRenderer
              mission={mission}
              data={{ ...mission.initialState, content: userInput }}
              onChange={(value) => setUserInput(value)}
            />
          </div>

          {/* Submit bar */}
          <div className="px-6 py-3 border-t border-border bg-primary flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result && (
                <span
                  className={`text-sm ${result.success ? "text-success" : "text-error"}`}
                >
                  {result.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={revealHint}
                disabled={hintIndex >= hints.length}
                className="btn btn-sm btn-ghost"
              >
                💡 Hint ({hintIndex}/{hints.length})
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={result?.success || isCompleted}
              >
                Submit Solution
              </button>
            </div>
          </div>
        </div>

        {/* Right: Task Panel (1/3 width) */}
        <div className="flex-[1] flex flex-col overflow-y-auto bg-primary/50">
          {/* Description */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
              Task Description
            </h3>
            <p className="text-sm text-text leading-relaxed">{description}</p>
          </div>

          {/* Guidelines */}
          {guidelines && (
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
                Guidelines & Explanation
              </h3>
              <div className="text-sm text-text-muted leading-relaxed space-y-2">
                {guidelines.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return (
                      <h4 key={i} className="text-text font-semibold mt-3">
                        {line.replace("## ", "")}
                      </h4>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h5 key={i} className="text-text font-medium mt-2">
                        {line.replace("### ", "")}
                      </h5>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-4">
                        {line.replace("- ", "")}
                      </li>
                    );
                  }
                  if (line.trim() === "") return null;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>
          )}

          {/* Revealed Hints */}
          {hints.length > 0 && (
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
                Hints
              </h3>
              <div className="space-y-3">
                {hints.slice(0, hintIndex).map((hint, index) => (
                  <div
                    key={index}
                    className="p-3 bg-accent/5 border border-accent/20 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-accent text-xs font-bold">💡</span>
                      <p className="text-xs text-text-muted">{hint}</p>
                    </div>
                  </div>
                ))}
                {hintIndex === 0 && (
                  <p className="text-xs text-text-dim italic">
                    Click "Hint" button to reveal hints (reduces XP)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Show Answer */}
          {solution && (
            <div className="p-6 border-b border-border">
              {!showAnswer ? (
                <button
                  onClick={handleShowAnswer}
                  className="w-full btn btn-sm border border-border-muted text-text-dim hover:text-text hover:bg-surface-hover"
                >
                  👁 Show Answer (one time only)
                </button>
              ) : (
                <div>
                  <h3 className="text-sm font-semibold text-success uppercase tracking-wider mb-3">
                    Answer
                  </h3>
                  <pre className="code-block text-xs overflow-x-auto">
                    <code>{solution}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Mission Info */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
              Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Type</span>
                <span className="text-text">{mission.type}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Reward</span>
                <span className="text-accent">
                  +{mission.xpReward || 100} XP
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Status</span>
                <span
                  className={result?.success ? "text-success" : "text-text-dim"}
                >
                  {result?.success || isCompleted ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
