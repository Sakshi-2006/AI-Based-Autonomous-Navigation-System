import { Bot, Radar, Map, Navigation, Cpu, Eye, Brain, Gauge } from 'lucide-react';

const workflowSteps = [
  {
    icon: Eye,
    title: 'Perception',
    desc: 'The system reads the environment — in a real robot this is cameras, LIDAR, and ultrasonic sensors. In our simulation, it reads the grid map and obstacle positions.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: Radar,
    title: 'Obstacle Detection',
    desc: 'Identifies which cells in the grid are blocked. In the real world, this maps to detecting pedestrians, walls, vehicles, and other hazards using computer vision (YOLO, OpenCV).',
    color: 'text-red-600 bg-red-50',
  },
  {
    icon: Brain,
    title: 'Decision Making',
    desc: 'The AI evaluates all possible routes and chooses the optimal one. We use the A* algorithm which combines actual travel cost with a heuristic estimate to find the shortest path efficiently.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Map,
    title: 'Path Planning',
    desc: 'Generates a step-by-step route from start to goal that avoids all obstacles. The algorithm explores cells in order of priority and backtracks to build the final path.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: Navigation,
    title: 'Navigation & Control',
    desc: 'The agent follows the planned path one cell at a time. In a real robot, this would translate to motor commands — forward, turn left, turn right — to follow the route.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Gauge,
    title: 'Simulation & Testing',
    desc: 'The virtual environment lets us test the navigation logic safely, visualize the explored nodes, and measure performance — without needing physical hardware.',
    color: 'text-indigo-600 bg-indigo-50',
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">How It Works</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">The Autonomous Navigation Pipeline</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Every autonomous system — from self-driving cars to warehouse robots — follows this same pipeline.
            Here is how each stage maps from real-world robotics to our simulation.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-slate-100 transition-colors group-hover:text-slate-200">
                  {i + 1}
                </div>
                <div className={`mb-4 inline-flex rounded-xl p-3 ${step.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-800">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-slate-800 p-8 text-white">
          <div className="mb-4 flex items-center gap-3">
            <Cpu className="h-6 w-6 text-sky-400" />
            <h3 className="text-xl font-bold">System Architecture (Data Flow)</h3>
          </div>
          <div className="overflow-x-auto">
            <pre className="text-sm leading-relaxed text-slate-300 font-mono">
{`┌─────────────┐    ┌──────────────┐    ┌────────────────┐    ┌───────────────┐
│  Environment │───▶│   Perception  │───▶│  Obstacle Map  │───▶│  Path Planner │
│  (Grid Map)  │    │  (Read Grid)  │    │  (Blocked Cells)│    │  (A* Algorithm)│
└─────────────┘    └──────────────┘    └────────────────┘    └───────┬───────┘
                                                                    │
                    ┌──────────────┐    ┌────────────────┐           │
                    │  Navigation  │◀───│   Path Output   │◀──────────┘
                    │  Controller  │    │  (Waypoint List)│
                    └──────┬───────┘    └────────────────┘
                           │
                    ┌──────▼───────┐
                    │   Agent      │
                    │  Movement    │
                    └──────────────┘`}
            </pre>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-700/50 p-4">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-sky-400">
                <Bot className="h-4 w-4" /> Input Layer
              </div>
              <p className="text-xs text-slate-400">Grid dimensions, obstacle positions, start/goal coordinates, algorithm selection.</p>
            </div>
            <div className="rounded-lg bg-slate-700/50 p-4">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-green-400">
                <Cpu className="h-4 w-4" /> Processing Layer
              </div>
              <p className="text-xs text-slate-400">A* / Dijkstra / BFS compute the optimal path, exploring nodes in priority order with heuristic guidance.</p>
            </div>
            <div className="rounded-lg bg-slate-700/50 p-4">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-400">
                <Navigation className="h-4 w-4" /> Output Layer
              </div>
              <p className="text-xs text-slate-400">Animated agent traversal, path visualization, explored-node display, and performance metrics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
