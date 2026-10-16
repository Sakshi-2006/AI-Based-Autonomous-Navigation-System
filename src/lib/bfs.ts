import type { GridCell, Point } from '@/types';

function getNeighborsBFS(cell: GridCell, grid: GridCell[][], allowDiagonal: boolean): GridCell[] {
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
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].type !== 'obstacle') {
      neighbors.push(grid[nr][nc]);
    }
  }
  return neighbors;
}

export interface BFSResult {
  path: Point[];
  explored: Point[];
  stats: {
    pathLength: number;
    nodesExplored: number;
    computationTimeMs: number;
    pathFound: boolean;
  };
}

export function runBFS(
  grid: GridCell[][],
  start: Point,
  goal: Point,
  allowDiagonal: boolean
): BFSResult {
  const startTime = performance.now();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      grid[r][c].parent = null;
    }
  }

  const startCell = grid[start.row][start.col];
  const goalCell = grid[goal.row][goal.col];
  const queue: GridCell[] = [startCell];
  const visited = new Set<string>();
  visited.add(`${start.row},${start.col}`);
  const exploredOrder: Point[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;

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

    const neighbors = getNeighborsBFS(current, grid, allowDiagonal);
    for (const neighbor of neighbors) {
      const nKey = `${neighbor.row},${neighbor.col}`;
      if (!visited.has(nKey)) {
        visited.add(nKey);
        neighbor.parent = current;
        queue.push(neighbor);
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
