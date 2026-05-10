import { useEffect, useState, useMemo } from 'react';

const PARTICLE_POSITIONS = [
  { top: 25, left: 35, delay: 0, duration: 2.5 },
  { top: 40, left: 70, delay: 0.3, duration: 3.0 },
  { top: 55, left: 25, delay: 0.6, duration: 2.8 },
  { top: 30, left: 60, delay: 0.9, duration: 3.2 },
  { top: 65, left: 45, delay: 1.2, duration: 2.6 },
  { top: 50, left: 30, delay: 1.5, duration: 3.4 },
];

export default function LoadingScreen({ message = 'Wait bestie wait...' }) {
  const [dots, setDots] = useState('');
  const [showCircles, setShowCircles] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    const timer = setTimeout(() => setShowCircles(true), 100);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center">
        {/* Main animated circles */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 rounded-full border-2 border-pink-300/20 animate-spin" style={{ animationDuration: '3s' }} />
          
          {/* Middle circle */}
          <div 
            className="absolute inset-2 rounded-full border-2 border-amber-300/30 animate-spin" 
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          />
          
          {/* Inner circle */}
          <div className="absolute inset-4 rounded-full border-2 border-blue-300/40 animate-spin" style={{ animationDuration: '1.5s' }} />
          
          {/* Center dot with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full animate-ping" />
          </div>

          {/* Orbiting dots */}
          {showCircles && (
            <>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
            </>
          )}
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <div className="text-text-dim text-lg font-light tracking-wide">
            {message}<span className="inline-block w-8 text-left">{dots}</span>
          </div>
          
          {/* Animated progress bar */}
          <div className="w-64 mx-auto h-1 bg-secondary/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-400 via-amber-400 to-blue-400 animate-loading-slide rounded-full" />
          </div>

          {/* Fun subtitle */}
          <div className="text-text-muted text-xs mt-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-pulse" />
            <span>Preparing your learning adventure</span>
            <span className="w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Floating particles */}
        {showCircles && (
          <div className="absolute inset-0 pointer-events-none">
            {PARTICLE_POSITIONS.map((p, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-pink-300/40 rounded-full animate-float"
                style={{
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
