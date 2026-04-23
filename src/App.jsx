import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Terminal from './components/Terminal';
import PipelineBuilder from './components/PipelineBuilder';
import TaskPanel from './components/TaskPanel';
import { useGameStore } from './store/gameStore';

function App() {
  const currentGameId = useGameStore(state => state.currentGameId);

  // Get current game type to render appropriate workspace
  const getCurrentGame = () => {
    const gameId = currentGameId;
    if (!gameId) return null;
    if (gameId.includes('sql')) return 'sql_debug';
    if (gameId.includes('terminal')) return 'terminal';
    if (gameId.includes('devops')) return 'pipeline';
    return null;
  };

  const gameType = getCurrentGame();

  const renderWorkspace = () => {
    switch (gameType) {
      case 'sql_debug':
        return <CodeEditor />;
      case 'terminal':
        return <Terminal />;
      case 'pipeline':
        return <PipelineBuilder />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-text-dim">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm">Select a mission from the sidebar to start training</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-primary">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <Header />

        {/* Workspace + Task Panel (two-column layout) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main workspace */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {currentGameId ? (
              <div className="flex-1 p-4 overflow-hidden">
                {renderWorkspace()}
              </div>
            ) : (
              renderWorkspace()
            )}
          </main>

          {/* Right panel - Task description & feedback */}
          <aside className="w-80 border-l border-border bg-primary overflow-hidden">
            <TaskPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
