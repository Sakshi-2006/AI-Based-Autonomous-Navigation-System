import { useRef, useEffect, useCallback, useState } from 'react';
import type { GridCell, Point, SimulationStats } from '@/types';
import { createGrid, setObstacles, runAStar, generateObstacles, generateMazeWalls } from '@/lib/astar';
import { runDijkstra } from '@/lib/dijkstra';
import { runBFS } from '@/lib/bfs';

type AlgoType = 'astar' | 'dijkstra' | 'bfs';
type ToolType = 'obstacle' | 'start' | 'goal' | 'eraser';

interface SimCanvasProps {
  rows: number;
  cols: number;
  algo: AlgoType;
  allowDiagonal: boolean;
  animationSpeed: number;
  tool: ToolType;
  obstacleDensity: number;
  preset: 'random' | 'maze' | 'empty';
  runSignal: number;
  resetSignal: number;
  clearObstaclesSignal: number;
  onStats: (stats: SimulationStats | null) => void;
  onRunningChange: (running: boolean) => void;
}

const ANIM_STEPS_PER_CELL = 1;

export default function SimCanvas({
  rows, cols, algo, allowDiagonal, animationSpeed, tool,
  obstacleDensity, preset, runSignal, resetSignal, clearObstaclesSignal,
  onStats, onRunningChange,
}: SimCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<GridCell[][]>(createGrid(rows, cols));
  const startRef = useRef<Point>({ row: Math.floor(rows / 2), col: 2 });
  const goalRef = useRef<Point>({ row: Math.floor(rows / 2), col: cols - 3 });
  const obstaclesRef = useRef<Point[]>([]);
  const mouseDownRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const [cellSize, setCellSize] = useState(24);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);

  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { onRunningChange(running); }, [running, onRunningChange]);

  useEffect(() => {
    const parent = canvasRef.current?.parentElement;
    if (!parent) return;
    const availW = parent.clientWidth - 4;
    const availH = 540;
    const sizeByW = Math.floor(availW / cols);
    const sizeByH = Math.floor(availH / rows);
    setCellSize(Math.max(8, Math.min(sizeByW, sizeByH)));
  }, [rows, cols]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grid = gridRef.current;
    const cs = cellSize;
    canvas.width = cols * cs;
    canvas.height = rows * cs;

    const start = startRef.current;
    const goal = goalRef.current;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        const x = c * cs;
        const y = r * cs;

        if (cell.type === 'obstacle') {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(x, y, cs, cs);
        } else if (r === start.row && c === start.col) {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(x, y, cs, cs);
          ctx.fillStyle = '#ffffff';
          ctx.font = `${Math.floor(cs * 0.55)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', x + cs / 2, y + cs / 2);
        } else if (r === goal.row && c === goal.col) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(x, y, cs, cs);
          ctx.fillStyle = '#ffffff';
          ctx.font = `${Math.floor(cs * 0.55)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('G', x + cs / 2, y + cs / 2);
        } else {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(x, y, cs, cs);
        }

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
      }
    }
  }, [rows, cols, cellSize]);

  const drawOverlay = useCallback((explored: Point[], path: Point[], agentIdx: number) => {
    drawGrid();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cs = cellSize;
    const grid = gridRef.current;

    for (const p of explored) {
      if (grid[p.row][p.col].type === 'obstacle') continue;
      if (p.row === startRef.current.row && p.col === startRef.current.col) continue;
      if (p.row === goalRef.current.row && p.col === goalRef.current.col) continue;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.fillRect(p.col * cs, p.row * cs, cs, cs);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.strokeRect(p.col * cs + 0.5, p.row * cs + 0.5, cs - 1, cs - 1);
    }

    for (let i = 0; i < path.length; i++) {
      const p = path[i];
      if (p.row === startRef.current.row && p.col === startRef.current.col) continue;
      if (p.row === goalRef.current.row && p.col === goalRef.current.col) continue;
      ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
      ctx.fillRect(p.col * cs, p.row * cs, cs, cs);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
      ctx.strokeRect(p.col * cs + 0.5, p.row * cs + 0.5, cs - 1, cs - 1);
    }

    if (agentIdx >= 0 && agentIdx < path.length) {
      const p = path[agentIdx];
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(p.col * cs + cs / 2, p.row * cs + cs / 2, cs * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [cellSize, drawGrid]);

  const applyPreset = useCallback((p: 'random' | 'maze' | 'empty') => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const grid = createGrid(rows, cols);
    let obs: Point[] = [];
    if (p === 'random') {
      obs = generateObstacles(rows, cols, obstacleDensity, startRef.current, goalRef.current);
    } else if (p === 'maze') {
      obs = generateMazeWalls(rows, cols, startRef.current, goalRef.current);
    }
    obstaclesRef.current = obs;
    setObstacles(grid, obs);
    gridRef.current = grid;
    onStats(null);
    drawGrid();
  }, [rows, cols, obstacleDensity, drawGrid, onStats]);

  useEffect(() => {
    applyPreset(preset);
  }, [preset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    applyPreset('random');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetSignal > 0) {
      applyPreset(preset);
    }
  }, [resetSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (clearObstaclesSignal > 0) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      const grid = createGrid(rows, cols);
      obstaclesRef.current = [];
      gridRef.current = grid;
      onStats(null);
      drawGrid();
    }
  }, [clearObstaclesSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    drawGrid();
  }, [rows, cols, cellSize]);

  const runSimulation = useCallback(() => {
    if (runningRef.current) return;
    setRunning(true);

    const grid = createGrid(rows, cols);
    setObstacles(grid, obstaclesRef.current);
    gridRef.current = grid;

    const start = startRef.current;
    const goal = goalRef.current;

    let result;
    if (algo === 'astar') {
      result = runAStar(grid, start, goal, allowDiagonal);
    } else if (algo === 'dijkstra') {
      result = runDijkstra(grid, start, goal, allowDiagonal);
    } else {
      result = runBFS(grid, start, goal, allowDiagonal);
    }

    onStats({
      pathLength: result.stats.pathLength,
      nodesExplored: result.stats.nodesExplored,
      computationTimeMs: result.stats.computationTimeMs,
      pathFound: result.stats.pathFound,
    });

    if (!result.stats.pathFound) {
      setRunning(false);
      drawOverlay(result.explored, [], -1);
      return;
    }

    const exploredCount = result.explored.length;
    const pathCount = result.path.length;
    const totalFrames = exploredCount + pathCount;
    let frame = 0;

    const animate = () => {
      if (!runningRef.current) return;

      if (frame < exploredCount) {
        const showCount = Math.min(frame + Math.max(1, Math.floor(exploredCount / (animationSpeed * 60))), exploredCount);
        frame = showCount;
        drawOverlay(result.explored.slice(0, showCount), [], -1);
      } else {
        const pathFrame = frame - exploredCount;
        const showPath = Math.min(pathFrame + ANIM_STEPS_PER_CELL, pathCount);
        frame = exploredCount + showPath;
        const agentIdx = showPath - 1;
        drawOverlay(result.explored, result.path.slice(0, showPath), agentIdx);
      }

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setRunning(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [rows, cols, algo, allowDiagonal, animationSpeed, drawOverlay, onStats]);

  useEffect(() => {
    if (runSignal > 0) {
      runSimulation();
    }
  }, [runSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row >= 0 && row < rows && col >= 0 && col < cols) return { row, col };
    return null;
  };

  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (running) return;
    const cell = getCellFromEvent(e);
    if (!cell) return;
    const start = startRef.current;
    const goal = goalRef.current;

    if (tool === 'start') {
      if (cell.row === goal.row && cell.col === goal.col) return;
      if (obstaclesRef.current.some(o => o.row === cell.row && o.col === cell.col)) return;
      startRef.current = cell;
      drawGrid();
    } else if (tool === 'goal') {
      if (cell.row === start.row && cell.col === start.col) return;
      if (obstaclesRef.current.some(o => o.row === cell.row && o.col === cell.col)) return;
      goalRef.current = cell;
      drawGrid();
    } else if (tool === 'obstacle') {
      if (cell.row === start.row && cell.col === start.col) return;
      if (cell.row === goal.row && cell.col === goal.col) return;
      if (!obstaclesRef.current.some(o => o.row === cell.row && o.col === cell.col)) {
        obstaclesRef.current.push(cell);
        const grid = gridRef.current;
        if (grid[cell.row] && grid[cell.row][cell.col]) {
          grid[cell.row][cell.col].type = 'obstacle';
        }
        drawGrid();
      }
    } else if (tool === 'eraser') {
      const idx = obstaclesRef.current.findIndex(o => o.row === cell.row && o.col === cell.col);
      if (idx >= 0) {
        obstaclesRef.current.splice(idx, 1);
        const grid = gridRef.current;
        if (grid[cell.row] && grid[cell.row][cell.col]) {
          grid[cell.row][cell.col].type = 'empty';
        }
        drawGrid();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseDownRef.current = true;
    handleCanvasInteraction(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mouseDownRef.current && (tool === 'obstacle' || tool === 'eraser')) {
      handleCanvasInteraction(e);
    }
  };

  const handleMouseUp = () => {
    mouseDownRef.current = false;
  };

  return (
    <div className="relative w-full overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-crosshair rounded-lg shadow-sm"
        style={{ imageRendering: 'pixelated' }}
      />
      {running && (
        <div className="absolute top-3 right-3 flex items-center gap-2 rounded-lg bg-sky-500/90 px-3 py-1.5 text-sm font-medium text-white shadow-lg">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
          Running...
        </div>
      )}
    </div>
  );
}
