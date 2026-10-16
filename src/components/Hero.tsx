import { Play, ArrowRight, Github, Cpu, Eye, Route } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(14,165,233,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 40%)'
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            AI & Robotics Simulation Project
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            AI-Based Autonomous<br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Navigation System
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
            A complete autonomous navigation pipeline — perception, obstacle detection,
            path planning with A*, and real-time agent movement — running in an interactive
            virtual simulation. No hardware required. Built with Python-grade algorithms,
            visualized in your browser.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#simulation"
              className="group flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600"
            >
              <Play className="h-4 w-4" /> Launch Simulation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#architecture"
              className="flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 text-sm font-bold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800"
            >
              <Github className="h-4 w-4" /> View Architecture
            </a>
          </div>

          <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Cpu, label: 'Algorithm', value: 'A* Search' },
              { icon: Eye, label: 'Perception', value: 'Grid-based' },
              { icon: Route, label: 'Path Planning', value: 'Optimal' },
              { icon: Play, label: 'Simulation', value: 'Real-time' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-sm">
                  <Icon className="mb-2 h-5 w-5 text-sky-400" />
                  <div className="text-sm font-bold text-white">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="font-semibold text-slate-300">Tech Stack:</span>
            <span>Python Algorithms</span>
            <span className="text-slate-600">|</span>
            <span>TypeScript</span>
            <span className="text-slate-600">|</span>
            <span>React + Canvas</span>
            <span className="text-slate-600">|</span>
            <span>Tailwind CSS</span>
            <span className="text-slate-600">|</span>
            <span>A* / Dijkstra / BFS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
