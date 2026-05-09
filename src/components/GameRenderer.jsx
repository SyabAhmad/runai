import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import PipelineBuilder from './PipelineBuilder';

export default function GameRenderer({ mission, data, onChange }) {
  if (!mission) return null;

  const handleChange = (value) => {
    if (onChange) onChange(value);
  };

  switch (mission.type) {
    case 'sql_debug':
    case 'ai_code':
      return (
        <CodeEditor
          value={data?.content || ''}
          language={mission.type === 'sql_debug' ? 'sql' : 'python'}
          mission={mission}
          onChange={handleChange}
        />
      );

    case 'terminal':
      return (
        <Terminal
          value={data?.content || ''}
          mission={mission}
          onChange={handleChange}
        />
      );

    case 'pipeline':
      return (
        <PipelineBuilder
          value={data?.content || ''}
          mission={mission}
          onChange={handleChange}
        />
      );

    default:
      return (
        <div className="panel p-4 text-text-dim">
          Unknown mission type: {mission.type}
        </div>
      );
  }
}
