import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export default function Terminal() {
  const { userInput, setUserInput, feedback } = useGameStore();
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [feedback, history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const command = userInput.trim();
      if (command) {
        // Add command to history
        setHistory([...history, { command, feedback }]);

        // Submit answer
        useGameStore.getState().submitAnswer();
      }

      // Clear input for next command or keep it for editing?
      // For the learning game, we want to see the command, so let's keep it
    }

    // Ctrl/Cmd + H for hint
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      useGameStore.getState().showNextHint();
    }

    // Focus input when clicking anywhere in terminal
    if (e.target === inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Custom prompt based on context
  const promptSymbol = '➜';
  const promptPath = '~';

  return (
    <div className="terminal w-full h-full flex flex-col" onClick={() => inputRef.current?.focus()}>
      {/* Terminal header */}
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <div className="flex-1 text-center text-text-dim text-xs">bash — 80x24</div>
      </div>

      {/* Terminal body */}
      <div className="terminal-body flex-1 overflow-y-auto scrollbar-thin" ref={terminalBodyRef}>
        {/* Welcome message */}
        <div className="mb-3 text-text-dim">
          <div>RunAI Terminal — Interactive Learning Environment</div>
          <div>Fix the command below and press Enter to submit.</div>
          <div className="mt-2 text-text-dim/70">
            Press <kbd className="px-1.5 py-0.5 bg-border rounded text-xs">Ctrl+H</kbd> for hint
          </div>
        </div>

        {/* Command history */}
        {history.map((entry, idx) => (
          <div key={idx} className="mb-3">
            {/* Command line */}
            <div className="terminal-prompt text-sm mb-1">
              <span className="text-[#6a9955]">{promptSymbol}</span>
              <span className="text-[#569cd6]"> {promptPath}</span>
              <span className="text-[#d4d4d4]"> $ {entry.command}</span>
            </div>
            {/* Output */}
            {entry.feedback && (
              <div className={`terminal-output ${entry.feedback.success ? 'success' : 'error'}`}>
                {entry.feedback.message}
              </div>
            )}
          </div>
        ))}

        {/* Current input line */}
        <div className="terminal-prompt text-sm">
          <span className="text-[#6a9955]">{promptSymbol}</span>
          <span className="text-[#569cd6]"> {promptPath}</span>
          <span className="text-[#d4d4d4]"> $ </span>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input flex-1 min-w-[200px]"
            placeholder="Enter command..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        {/* Current feedback */}
        {feedback && !history.some(h => h.feedback === feedback) && (
          <div className={`terminal-output ${feedback.success ? 'success' : 'error'} mt-2`}>
            {feedback.message}
          </div>
        )}
      </div>

      {/* Terminal status bar */}
      <div className="px-3 py-1 bg-[#1a1a1a] border-t border-border text-xs text-text-dim flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>Ready</span>
        </div>
        <div>Press <kbd className="px-1 py-0.5 bg-border rounded">Enter</kbd> to run</div>
      </div>
    </div>
  );
}
