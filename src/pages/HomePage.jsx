import { Link } from "react-router-dom";

// Match: games/[tech]/[chapter]/mission_XX/games.json
const missionModules = import.meta.glob(
  "../data/games/**/mission_*/games.json",
  { eager: true },
);

export default function HomePage() {
  const techSet = new Set();
  Object.keys(missionModules).forEach((path) => {
    const parts = path.split("/");
    // ../data/games/[tech]/...
    const tech = parts[3];
    if (tech) techSet.add(tech);
  });
  const technologies = Array.from(techSet);

  const renderIcon = (tech) => {
    const icons = {
      sql: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
      terminal:
        "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      pipeline:
        "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      ai_engineering:
        "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    };
    const d = icons[tech] || icons.pipeline;
    return (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={d}
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-text">RunAI Learn</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-text hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-text hover:text-accent transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-8">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
              Master Real Engineering Skills
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-10">
              Interactive learning platform for SQL, DevOps, AI, and more. Level
              up your technical skills with hands-on missions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="#technologies"
                className="px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap"
              >
                Explore Technologies
              </Link>
              <Link
                to="/profile"
                className="px-8 py-3 bg-transparent text-accent border border-accent rounded-lg font-medium hover:bg-accent hover:bg-opacity-10 transition-all whitespace-nowrap"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Learn In-Demand Skills
            </h2>
            <p className="text-text-muted">
              Choose from various technology tracks designed to enhance your
              engineering expertise through interactive challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech) => {
              const display = tech
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
              return (
                <Link
                  key={tech}
                  to={`/${tech}`}
                  className="panel block p-5 hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors">
                      {renderIcon(tech)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors">
                        {display}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        Start learning with interactive missions
                      </p>
                    </div>
                    <div className="ml-auto text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-5 h-5"
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
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Why Learn With Us?
            </h2>
            <p className="text-text-muted">
              Our platform offers unique learning opportunities that combine
              theory with practical application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Hands-On Learning
              </h3>
              <p className="text-text-muted">
                Practice directly in simulated environments that mirror
                real-world development scenarios.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Progressive Difficulty
              </h3>
              <p className="text-text-muted">
                Start with fundamentals and gradually advance to complex topics
                with structured missions.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Real-Time Feedback
              </h3>
              <p className="text-text-muted">
                Get instant validation and feedback as you complete missions to
                accelerate your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-8 px-6 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold text-text">RunAI Learn</span>
              </div>
              <p className="text-text-muted text-sm">
                Interactive learning platform for mastering engineering skills
                through hands-on practice.
              </p>
            </div>

            <div>
              <h4 className="text-text font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="#technologies"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Technologies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-text font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-text font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-text-muted text-sm">
            <p>
              © {new Date().getFullYear()} RunAI Learn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
