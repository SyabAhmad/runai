import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./LoadingScreen.css";

// Simple inline LoadingScreen component
function LoadingScreen({ message = "Wait bestie wait..." }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] flex items-center justify-center">
      <div className="text-text-dim text-lg font-light tracking-wide">
        {message}
        <span className="inline-block w-8 text-left">{dots}</span>
      </div>
    </div>
  );
}

function BootApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Wait bestie wait..." />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(<BootApp />);
