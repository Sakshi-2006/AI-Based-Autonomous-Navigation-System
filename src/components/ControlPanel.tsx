import { Target, Flag, Square, Eraser, Play, RotateCcw, Trash2, Cpu } from 'lucide-react';

type AlgoType = 'astar' | 'dijkstra' | 'bfs';
type ToolType = 'obstacle' | 'start' | 'goal' | 'eraser';
type PresetType = 'random' | 'maze' | 'empty';

interface ControlPanelProps {
  algo: AlgoType;
  setAlgo: (a: AlgoType) => void;
  allowDiagonal: boolean;
  setAllowDiagonal: (v: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (v: number) => void;
  tool: ToolType;
  setTool: (t: ToolType) => void;
  preset: PresetType;
  setPreset: (p: PresetType) => void;
  obstacleDensity: number;
  setObstacleDensity: (v: number) => void;
  rows: number;
  cols: number;
  setRows: (v: number) => void;
  setCols: (v: number) => void;
  onRun: () => void;
  onReset: () => void;
  onClearObstacles: () => void;
  running: boolean;
}

const tools: { id: ToolType; label: string; icon: typeof Target; color: string }[] = [
  { id: 'obstacle', label: 'Wall', icon: Square, color: 'slate' },
  { id: 'start', label: 'Start', icon: Target, color: 'green' },
  { id: 'goal', label: 'Goal', icon: Flag, color: 'red' },
  { id: 'eraser', label: 'Eraser', icon: Eraser, color: 'amber' },
];

const algos: { id: AlgoType; label: string; desc: string }[] = [
  { id: 'astar', label: 'A* Search', desc: 'Heuristic-guided optimal path' },
  { id: 'dijkstra', label: "Dijkstra's", desc: 'Guaranteed shortest path' },
  { id: 'bfs', label: 'BFS', desc: 'Breadth-first exploration' },
];

export default function ControlPanel(props: ControlPanelProps) {
  const {
    algo, setAlgo, allowDiagonal, setAllowDiagonal, animationSpeed, setAnimationSpeed,
    tool, setTool, preset, setPreset, obstacleDensity, setObstacleDensity,
    rows, cols, setRows, setCols, onRun, onReset, onClearObstacles, running,
  } = props;

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Cpu className="h-4 w-4" /> Path Planning Algorithm
        </div>
        <div className="space-y-2">
          {algos.map(a => (
            <button
              key={a.id}
              onClick={() => setAlgo(a.id)}
              className={`w-full rounded-lg border px-3 py-2.5 text-left transition-all ${
                algo === a.id
                  ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`text-sm font-semibold ${algo === a.id ? 'text-sky-700' : 'text-slate-700'}`}>
                {a.label}
              </div>
              <div className="text-xs text-slate-400">{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Edit Tool
        </div>
        <div className="grid grid-cols-2 gap-2">
          {tools.map(t => {
            const Icon = t.icon;
            const active = tool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'border-slate-800 bg-slate-800 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-400">Click and drag on the grid to draw walls or move start/goal.</p>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Environment Preset
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['random', 'maze', 'empty'] as PresetType[]).map(p => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-all ${
                preset === p
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/30'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {preset === 'random' && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Obstacle Density</span>
            <span className="text-xs font-bold text-slate-700">{Math.round(obstacleDensity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={0.4}
            step={0.01}
            value={obstacleDensity}
            onChange={e => setObstacleDensity(parseFloat(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>
      )}

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Animation Speed</span>
          <span className="text-xs font-bold text-slate-700">{animationSpeed}x</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={5}
          step={0.5}
          value={animationSpeed}
          onChange={e => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full accent-sky-500"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Grid Size</span>
          <span className="text-xs font-bold text-slate-700">{rows} x {cols}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={15}
            max={45}
            step={1}
            value={rows}
            onChange={e => { setRows(parseInt(e.target.value)); setCols(parseInt(e.target.value)); }}
            className="w-full accent-slate-600"
          />
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5">
          <span className="text-sm font-medium text-slate-700">Diagonal Movement</span>
          <button
            onClick={() => setAllowDiagonal(!allowDiagonal)}
            className={`relative h-6 w-11 rounded-full transition-colors ${allowDiagonal ? 'bg-sky-500' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${allowDiagonal ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </label>
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-4">
        <button
          onClick={onRun}
          disabled={running}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:from-sky-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-4 w-4" /> Run Navigation
        </button>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={onClearObstacles}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
          >
            <Trash2 className="h-4 w-4" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
