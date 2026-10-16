import { Code2, Grid3x3, Map, Zap, BarChart3, Layers } from 'lucide-react';

const modules = [
  {
    icon: Grid3x3,
    title: 'Environment Module',
    file: 'src/lib/astar.ts → createGrid()',
    desc: 'Creates a 2D grid representing the world. Each cell can be empty, an obstacle, the start point, or the goal. This is the virtual equivalent of a robot\'s physical environment.',
    color: 'border-slate-200 bg-white',
  },
  {
    icon: Layers,
    title: 'Perception Module',
    file: 'src/lib/astar.ts → setObstacles()',
    desc: 'Reads obstacle positions and marks cells as blocked. In a real system, this would receive data from cameras, LIDAR, and ultrasonic sensors to build an occupancy grid.',
    color: 'border-slate-200 bg-white',
  },
  {
    icon: Map,
    title: 'Path Planning Module',
    file: 'src/lib/astar.ts → runAStar()',
    desc: 'The core AI. Implements A* with a Manhattan/Octile distance heuristic. Explores cells in priority order (lowest f = g + h), guarantees the shortest path, and returns the waypoint list.',
    color: 'border-slate-200 bg-white',
  },
  {
    icon: Zap,
    title: 'Navigation Controller',
    file: 'src/components/SimCanvas.tsx',
    desc: 'Takes the planned path and moves the agent along it cell by cell. In a real robot, this would send motor commands (forward, turn) to follow the route. Here, it animates the blue agent dot.',
    color: 'border-slate-200 bg-white',
  },
  {
    icon: BarChart3,
    title: 'Performance Metrics',
    file: 'src/components/StatsDashboard.tsx',
    desc: 'Tracks path length, nodes explored, computation time, and success/failure. These metrics let you compare algorithms (A* vs Dijkstra vs BFS) objectively.',
    color: 'border-slate-200 bg-white',
  },
  {
    icon: Code2,
    title: 'Visualization Engine',
    file: 'src/components/SimCanvas.tsx',
    desc: 'Renders the grid, obstacles, explored nodes (purple), planned path (green), and agent position on an HTML Canvas with real-time animation at 60fps.',
    color: 'border-slate-200 bg-white',
  },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Under the Hood</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">Project Architecture & Modules</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            The system is built as a modular pipeline. Each module has a single responsibility
            and passes data to the next — the same separation used in production autonomous systems.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.title} className={`rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${m.color}`}>
                <div className="mb-4 inline-flex rounded-xl bg-sky-50 p-3 text-sky-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-base font-bold text-slate-800">{m.title}</h3>
                <div className="mb-2 inline-block rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
                  {m.file}
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{m.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Languages', value: 'TypeScript, Python-ready' },
            { label: 'Algorithms', value: 'A*, Dijkstra, BFS' },
            { label: 'Framework', value: 'React + Vite' },
            { label: 'Rendering', value: 'HTML5 Canvas' },
          ].map(item => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="text-sm font-bold text-slate-800">{item.value}</div>
              <div className="mt-1 text-xs text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
