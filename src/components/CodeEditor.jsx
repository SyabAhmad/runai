import { useState, useRef, useEffect } from 'react';

export default function CodeEditor({ value = '', onChange, mission, language = 'sql' }) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      if (onChange) onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
    // Ctrl/Cmd + Enter to submit (parent handles this)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      // Submit is handled by parent MissionPage
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [value]);

  const lines = value.split('\n');

  return (
    <div className="code-block w-full h-full flex flex-col overflow-hidden">
      {/* Editor header */}
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
          <span className="text-xs">{language.toUpperCase()}</span>
        </div>
      </div>

      {/* Editor content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="select-none py-3 px-2 bg-[#0d1117] border-r border-border text-right text-text-dim text-sm">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
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
          style={{ tabSize: 4, lineHeight: '1.6' }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-t border-border text-xs">
        <div className="flex items-center gap-3 text-text-dim">
          <span>Ln {value.split('\n').length}, Col {cursorPosition + 1}</span>
          <span>UTF-8</span>
          <span>{language.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-3 text-text-dim">
          <span>Press Ctrl+Enter to submit</span>
        </div>
      </div>
    </div>
  );
}
