import { Route, Eye, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { SimulationStats } from '@/types';

interface StatsDashboardProps {
  stats: SimulationStats | null;
  running: boolean;
  algo: string;
}

export default function StatsDashboard({ stats, running, algo }: StatsDashboardProps) {
  const cards = [
    {
      label: 'Path Length',
      value: stats ? `${stats.pathLength} steps` : '—',
      icon: Route,
      color: 'text-sky-600 bg-sky-50',
    },
    {
      label: 'Nodes Explored',
      value: stats ? `${stats.nodesExplored}` : '—',
      icon: Eye,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Compute Time',
      value: stats ? `${stats.computationTimeMs.toFixed(2)} ms` : '—',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Path Found',
      value: stats ? (stats.pathFound ? 'Yes' : 'No') : '—',
      icon: stats?.pathFound ? CheckCircle2 : stats?.pathFound === false ? XCircle : CheckCircle2,
      color: stats?.pathFound ? 'text-green-600 bg-green-50' : stats?.pathFound === false ? 'text-red-600 bg-red-50' : 'text-slate-400 bg-slate-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className={`mb-2 inline-flex rounded-lg p-2 ${card.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-lg font-bold text-slate-800">{card.value}</div>
            <div className="text-xs text-slate-400">{card.label}</div>
          </div>
        );
      })}
      <div className="col-span-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 sm:col-span-4">
        <span className="text-xs font-medium text-slate-500">Active Algorithm</span>
        <span className="text-sm font-bold capitalize text-slate-800">{algo === 'astar' ? 'A* Search' : algo === 'dijkstra' ? "Dijkstra's" : 'BFS'}</span>
      </div>
    </div>
  );
}
