import { useState, useRef, useCallback } from 'react';

export default function CodeEditor({ value = '', onChange, language = 'sql' }) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);
  const lineNumsRef = useRef(null);

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
  };

  const handleScroll = useCallback(() => {
    if (lineNumsRef.current && textareaRef.current) {
      lineNumsRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const lines = value.split('\n');

  return (
    <div className="code-block w-full h-full flex flex-col overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-b border-border text-xs shrink-0">
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
      <div className="flex-1 flex min-h-0">
        {/* Line numbers */}
        <div
          ref={lineNumsRef}
          className="select-none py-3 px-2 bg-[#0d1117] border-r border-border text-right text-text-dim text-sm overflow-hidden"
          style={{ lineHeight: '1.6', fontFamily: 'monospace', width: '44px' }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
          <div style={{ height: '156px' }} />
        </div>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onSelect={() => setCursorPosition(textareaRef.current?.selectionStart ?? 0)}
          onClick={() => setCursorPosition(textareaRef.current?.selectionStart ?? 0)}
          placeholder="Enter your code here..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 py-3 px-3 bg-transparent text-[#e6edf3] font-mono text-sm outline-none caret-accent resize-none scrollbar-thin"
          style={{
            tabSize: 4,
            lineHeight: '1.6',
            minHeight: 0,
            paddingBottom: '156px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#30363d #0d1117',
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0d1117] border-t border-border text-xs shrink-0">
        <div className="flex items-center gap-3 text-text-dim">
          <span>Ln {lines.length}, Col {cursorPosition + 1}</span>
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