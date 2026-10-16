import { useState, useCallback } from 'react';
import { Bot, Menu, X } from 'lucide-react';
import Hero from '@/components/Hero';
import SimCanvas from '@/components/SimCanvas';
import ControlPanel from '@/components/ControlPanel';
import StatsDashboard from '@/components/StatsDashboard';
import WorkflowSection from '@/components/WorkflowSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import UseCaseSection from '@/components/UseCaseSection';
import InterviewSection from '@/components/InterviewSection';
import FutureSection from '@/components/FutureSection';
import type { SimulationStats } from '@/types';

type AlgoType = 'astar' | 'dijkstra' | 'bfs';
type ToolType = 'obstacle' | 'start' | 'goal' | 'eraser';
type PresetType = 'random' | 'maze' | 'empty';

const navLinks = [
  { href: '#simulation', label: 'Simulation' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#industry', label: 'Industry' },
  { href: '#interview', label: 'Interview' },
  { href: '#future', label: 'Future' },
];

function App() {
  const [algo, setAlgo] = useState<AlgoType>('astar');
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1.5);
  const [tool, setTool] = useState<ToolType>('obstacle');
  const [preset, setPreset] = useState<PresetType>('maze');
  const [obstacleDensity, setObstacleDensity] = useState(0.2);
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);
  const [runSignal, setRunSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [clearObstaclesSignal, setClearObstaclesSignal] = useState(0);
  const [stats, setStats] = useState<SimulationStats | null>(null);
  const [running, setRunning] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleRun = useCallback(() => setRunSignal(s => s + 1), []);
  const handleReset = useCallback(() => setResetSignal(s => s + 1), []);
  const handleClearObstacles = useCallback(() => setClearObstaclesSignal(s => s + 1), []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">AI Navigation System</div>
              <div className="text-xs text-slate-400">Autonomous Path Planning Simulation</div>
            </div>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileNavOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-3 md:hidden">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <Hero />

      {/* Simulation Lab */}
      <section id="simulation" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Live Demo</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">Interactive Navigation Simulator</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Place obstacles, set start and goal positions, choose an algorithm, and watch the AI
              find the optimal path in real-time. Purple cells show explored nodes, green cells show
              the final path, and the blue dot is your autonomous agent.
            </p>
          </div>

          <div className="mb-6">
            <StatsDashboard stats={stats} running={running} algo={algo} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#22c55e]" /> Start</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#ef4444]" /> Goal</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#1e293b]" /> Obstacle</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#0ea5e9]" /> Agent</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-purple-200" /> Explored</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-green-200" /> Path</span>
              </div>
              <SimCanvas
                rows={rows}
                cols={cols}
                algo={algo}
                allowDiagonal={allowDiagonal}
                animationSpeed={animationSpeed}
                tool={tool}
                obstacleDensity={obstacleDensity}
                preset={preset}
                runSignal={runSignal}
                resetSignal={resetSignal}
                clearObstaclesSignal={clearObstaclesSignal}
                onStats={setStats}
                onRunningChange={setRunning}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-bold text-slate-800">Control Panel</h3>
              <ControlPanel
                algo={algo}
                setAlgo={setAlgo}
                allowDiagonal={allowDiagonal}
                setAllowDiagonal={setAllowDiagonal}
                animationSpeed={animationSpeed}
                setAnimationSpeed={setAnimationSpeed}
                tool={tool}
                setTool={setTool}
                preset={preset}
                setPreset={setPreset}
                obstacleDensity={obstacleDensity}
                setObstacleDensity={setObstacleDensity}
                rows={rows}
                cols={cols}
                setRows={setRows}
                setCols={setCols}
                onRun={handleRun}
                onReset={handleReset}
                onClearObstacles={handleClearObstacles}
                running={running}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <WorkflowSection />

      {/* Architecture */}
      <ArchitectureSection />

      {/* Industry Use Cases */}
      <UseCaseSection />

      {/* Interview Prep */}
      <InterviewSection />

      {/* Future Improvements */}
      <FutureSection />

      {/* Footer */}
      <footer className="bg-slate-900 py-10 text-center text-slate-400">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white">AI-Based Autonomous Navigation System</span>
          </div>
          <p className="text-sm">
            A portfolio project demonstrating perception, path planning, and autonomous navigation
            in a virtual simulation. Built with A*, Dijkstra, and BFS algorithms.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Technologies: TypeScript · React · HTML5 Canvas · Tailwind CSS · Path Planning Algorithms
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
