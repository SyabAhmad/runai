import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export default function CodeEditor() {
  const { userInput, setUserInput } = useGameStore();
  const textareaRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = userInput.substring(0, start) + '  ' + userInput.substring(end);
      setUserInput(newValue);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }

    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      useGameStore.getState().submitAnswer();
    }

    // Show hint with Ctrl/Cmd + H
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      useGameStore.getState().showNextHint();
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [userInput]);

  // Split into lines for line numbers
  const lines = userInput.split('\n');

  return (
    <div className="code-block w-full h-full flex flex-col overflow-hidden">
      {/* Editor header/toolbar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-b border-border text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
          </div>
          <span className="text-text-dim ml-2">editor</span>
        </div>
        <div className="flex items-center gap-3 text-text-dim">
          <span className="text-xs">UTF-8</span>
          <span className="text-xs">SQL</span>
        </div>
      </div>

      {/* Editor content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="select-none py-3 px-2 bg-[#0d1117] border-r border-border text-right text-text-dim text-sm">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text input area */}
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSelect={() => {
            const textarea = textareaRef.current;
            setCursorPosition(textarea.selectionStart);
          }}
          onClick={(e) => {
            const textarea = e.target;
            setCursorPosition(textarea.selectionStart);
          }}
          placeholder="Enter your code here..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 py-3 px-3 bg-transparent text-[#e6edf3] font-mono text-sm leading-6 resize-none outline-none caret-accent"
          style={{
            tabSize: 4,
            lineHeight: '1.6',
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-t border-border text-xs">
        <div className="flex items-center gap-3 text-text-dim">
          <span>Ln {userInput.split('\n').length}, Col {cursorPosition + 1}</span>
          <span>UTF-8</span>
          <span>SQL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-text-dim">Press Ctrl+Enter to run</span>
        </div>
      </div>
    </div>
  );
}
