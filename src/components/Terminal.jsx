import { useState, useRef, useEffect } from 'react';

export default function Terminal({ value = '', onChange, mission }) {
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = value.trim();
      if (command) {
        setHistory([...history, { command, output: '' }]);
        if (onChange) onChange('');
      }
    }
    // Ctrl/Cmd + H for hint (handled by parent)
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
    }
  };

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
        </div>

        {/* Command history */}
        {history.map((entry, idx) => (
          <div key={idx} className="mb-3">
            <div className="terminal-prompt text-sm mb-1">
              <span className="text-[#6a9955]">{promptSymbol}</span>
              <span className="text-[#569cd6]"> {promptPath}</span>
              <span className="text-[#d4d4d4]"> $ {entry.command}</span>
            </div>
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
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input flex-1 min-w-[200px]"
            placeholder="Enter command..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
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
