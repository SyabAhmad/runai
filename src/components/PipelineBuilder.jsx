import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

const ALL_STEPS = ['build', 'test', 'deploy', 'lint', 'scan', 'push'];

export default function PipelineBuilder() {
  const { userInput, setUserInput } = useGameStore();
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Parse current pipeline from userInput string
  const getCurrentPipeline = () => {
    if (!userInput) return [];
    try {
      // Try parsing as array
      if (userInput.startsWith('[')) {
        const parsed = JSON.parse(userInput);
        return Array.isArray(parsed) ? parsed : [];
      }
      // Parse as comma-separated
      return userInput.split(',').map(s => s.trim()).filter(Boolean);
    } catch {
      return userInput.split(' ').filter(Boolean);
    }
  };

  const pipeline = getCurrentPipeline();

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== draggedItem) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (draggedItem === null || draggedItem === dropIndex) return;

    const newPipeline = [...pipeline];
    const [movedItem] = newPipeline.splice(draggedItem, 1);
    newPipeline.splice(dropIndex, 0, movedItem);

    setUserInput(JSON.stringify(newPipeline));
    setDraggedItem(null);
  };

  const addStep = (step) => {
    if (!pipeline.includes(step)) {
      const newPipeline = [...pipeline, step];
      setUserInput(JSON.stringify(newPipeline));
    }
  };

  const removeStep = (index) => {
    const newPipeline = pipeline.filter((_, i) => i !== index);
    setUserInput(JSON.stringify(newPipeline));
  };

  const moveStep = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pipeline.length) return;

    const newPipeline = [...pipeline];
    [newPipeline[index], newPipeline[newIndex]] = [newPipeline[newIndex], newPipeline[index]];
    setUserInput(JSON.stringify(newPipeline));
  };

  const unusedSteps = ALL_STEPS.filter(step => !pipeline.includes(step));

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-text mb-1">Pipeline Builder</h3>
        <p className="text-xs text-text-dim">
          Drag to reorder steps. Build the correct CI/CD sequence.
        </p>
      </div>

      {/* Active pipeline area */}
      <div className="mb-6">
        <div className="text-xs font-medium text-text-dim mb-2 uppercase tracking-wider">
          Active Pipeline
        </div>

        {pipeline.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-text-dim text-sm">
            Drag steps here to start building your pipeline
          </div>
        ) : (
          <div className="space-y-2">
            {pipeline.map((step, index) => (
              <div
                key={`${step}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  group flex items-center gap-2 p-3 rounded-lg border cursor-move
                  transition-all duration-150
                  ${dragOverIndex === index
                    ? 'border-accent bg-accent/10 scale-[1.02]'
                    : 'border-border bg-surface hover:border-border-muted'
                  }
                `}
              >
                {/* Drag handle */}
                <div className="cursor-grab active:cursor-grabbing text-text-dim hover:text-text">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <span className="font-mono text-sm text-accent">{step}</span>
                </div>

                {/* Move buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                    className="btn btn-sm p-1 disabled:opacity-30"
                    title="Move up"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveStep(index, 1)}
                    disabled={index === pipeline.length - 1}
                    className="btn btn-sm p-1 disabled:opacity-30"
                    title="Move down"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeStep(index)}
                    className="btn btn-sm p-1 text-error hover:bg-error/10"
                    title="Remove step"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available steps palette */}
      {unusedSteps.length > 0 && (
        <div className="flex-1">
          <div className="text-xs font-medium text-text-dim mb-2 uppercase tracking-wider">
            Available Steps
          </div>
          <div className="flex flex-wrap gap-2">
            {unusedSteps.map((step) => (
              <div
                key={step}
                onClick={() => addStep(step)}
                className="
                  cursor-pointer px-3 py-2 rounded-md border border-border
                  bg-surface hover:bg-surface-hover hover:border-accent
                  transition-all duration-150 group
                "
              >
                <span className="font-mono text-sm text-text group-hover:text-accent">
                  {step}
                </span>
                <span className="ml-1.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  +
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline visualization */}
      {pipeline.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs font-medium text-text-dim mb-2 uppercase tracking-wider">
            Flow Preview
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {pipeline.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex items-center gap-1 px-2 py-1 bg-secondary border border-border rounded-md">
                  <span className="font-mono text-xs text-accent">{step}</span>
                </div>
                {index < pipeline.length - 1 && (
                  <svg className="w-4 h-4 text-text-dim mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
