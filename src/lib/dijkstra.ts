import type { GridCell, Point } from '@/types';

function dijkstraHeuristic(_a: Point, _b: Point): number {
  return 0;
}

function getNeighborsDijkstra(cell: GridCell, grid: GridCell[][], allowDiagonal: boolean): GridCell[] {
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

export interface DijkstraResult {
  path: Point[];
  explored: Point[];
  stats: {
    pathLength: number;
    nodesExplored: number;
    computationTimeMs: number;
    pathFound: boolean;
  };
}

export function runDijkstra(
  grid: GridCell[][],
  start: Point,
  goal: Point,
  allowDiagonal: boolean
): DijkstraResult {
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
  startCell.f = 0;

  const openSet: GridCell[] = [startCell];
  const closedSet = new Set<string>();
  const exploredOrder: Point[] = [];

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.g - b.g);
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

    const neighbors = getNeighborsDijkstra(current, grid, allowDiagonal);
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
        neighbor.f = tentativeG;
        neighbor.h = dijkstraHeuristic(neighbor, goal);
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
