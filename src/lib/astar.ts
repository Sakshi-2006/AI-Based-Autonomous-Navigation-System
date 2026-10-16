import type { GridCell, CellType, Point } from '@/types';

export function createGrid(rows: number, cols: number): GridCell[][] {
  const grid: GridCell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: GridCell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        type: 'empty',
        g: Infinity,
        h: 0,
        f: Infinity,
        parent: null,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function setObstacles(grid: GridCell[][], obstacles: Point[]): void {
  for (const obs of obstacles) {
    if (obs.row >= 0 && obs.row < grid.length && obs.col >= 0 && obs.col < grid[0].length) {
      grid[obs.row][obs.col].type = 'obstacle';
    }
  }
}

function heuristic(a: Point, b: Point, allowDiagonal: boolean): number {
  if (allowDiagonal) {
    const dx = Math.abs(a.col - b.col);
    const dy = Math.abs(a.row - b.row);
    return (dx + dy) + (Math.SQRT2 - 2) * Math.min(dx, dy);
  }
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

function getNeighbors(cell: GridCell, grid: GridCell[][], allowDiagonal: boolean): GridCell[] {
  const neighbors: GridCell[] = [];
  const { row, col } = cell;
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = allowDiagonal
    ? [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    : [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      if (grid[nr][nc].type !== 'obstacle') {
        if (allowDiagonal && dr !== 0 && dc !== 0) {
          if (grid[row + dr][col].type === 'obstacle' || grid[row][col + dc].type === 'obstacle') {
            continue;
          }
        }
        neighbors.push(grid[nr][nc]);
      }
    }
  }
  return neighbors;
}

export interface AStarResult {
  path: Point[];
  explored: Point[];
  stats: {
    pathLength: number;
    nodesExplored: number;
    computationTimeMs: number;
    pathFound: boolean;
  };
}

export function runAStar(
  grid: GridCell[][],
  start: Point,
  goal: Point,
  allowDiagonal: boolean
): AStarResult {
  const startTime = performance.now();
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c].g = Infinity;
      grid[r][c].h = 0;
      grid[r][c].f = Infinity;
      grid[r][c].parent = null;
    }
  }

  const startCell = grid[start.row][start.col];
  const goalCell = grid[goal.row][goal.col];
  startCell.g = 0;
  startCell.h = heuristic(start, goal, allowDiagonal);
  startCell.f = startCell.h;

  const openSet: GridCell[] = [startCell];
  const closedSet = new Set<string>();
  const exploredOrder: Point[] = [];

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f || a.h - b.h);
    const current = openSet.shift()!;
    const key = `${current.row},${current.col}`;
    closedSet.add(key);

    if (current !== startCell && current !== goalCell) {
      exploredOrder.push({ row: current.row, col: current.col });
    }

    if (current === goalCell) {
      const path: Point[] = [];
      let node: GridCell | null = current;
      while (node) {
        path.unshift({ row: node.row, col: node.col });
        node = node.parent;
      }
      const endTime = performance.now();
      return {
        path,
        explored: exploredOrder,
        stats: {
          pathLength: path.length - 1,
          nodesExplored: exploredOrder.length,
          computationTimeMs: endTime - startTime,
          pathFound: true,
        },
      };
    }

    const neighbors = getNeighbors(current, grid, allowDiagonal);
    for (const neighbor of neighbors) {
      const nKey = `${neighbor.row},${neighbor.col}`;
      if (closedSet.has(nKey)) continue;

      const moveCost = (Math.abs(neighbor.row - current.row) + Math.abs(neighbor.col - current.col) === 2)
        ? Math.SQRT2
        : 1;
      const tentativeG = current.g + moveCost;

      if (tentativeG < neighbor.g) {
        neighbor.parent = current;
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, goal, allowDiagonal);
        neighbor.f = neighbor.g + neighbor.h;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  const endTime = performance.now();
  return {
    path: [],
    explored: exploredOrder,
    stats: {
      pathLength: 0,
      nodesExplored: exploredOrder.length,
      computationTimeMs: endTime - startTime,
      pathFound: false,
    },
  };
}

export function generateObstacles(
  rows: number,
  cols: number,
  density: number,
  start: Point,
  goal: Point
): Point[] {
  const obstacles: Point[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === start.row && c === start.col) continue;
      if (r === goal.row && c === goal.col) continue;
      if (Math.random() < density) {
        obstacles.push({ row: r, col: c });
      }
    }
  }
  return obstacles;
}

export function generateMazeWalls(rows: number, cols: number, start: Point, goal: Point): Point[] {
  const obstacles: Point[] = [];
  const wallPatterns = [
    { r: Math.floor(rows * 0.2), c: Math.floor(cols * 0.3), len: Math.floor(cols * 0.3), dir: 'h' },
    { r: Math.floor(rows * 0.5), c: Math.floor(cols * 0.15), len: Math.floor(rows * 0.3), dir: 'v' },
    { r: Math.floor(rows * 0.35), c: Math.floor(cols * 0.6), len: Math.floor(rows * 0.4), dir: 'v' },
    { r: Math.floor(rows * 0.7), c: Math.floor(cols * 0.4), len: Math.floor(cols * 0.35), dir: 'h' },
    { r: Math.floor(rows * 0.15), c: Math.floor(cols * 0.7), len: Math.floor(rows * 0.2), dir: 'v' },
  ];

  for (const wall of wallPatterns) {
    for (let i = 0; i < wall.len; i++) {
      const r = wall.dir === 'h' ? wall.r : wall.r + i;
      const c = wall.dir === 'h' ? wall.c + i : wall.c;
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        if (!(r === start.row && c === start.col) && !(r === goal.row && c === goal.col)) {
          obstacles.push({ row: r, col: c });
        }
      }
    }
  }
  return obstacles;
}
