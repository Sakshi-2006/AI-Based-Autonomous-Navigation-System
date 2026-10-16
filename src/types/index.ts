export type CellType = 'empty' | 'obstacle' | 'start' | 'goal' | 'path' | 'explored' | 'agent';

export interface GridCell {
  row: number;
  col: number;
  type: CellType;
  g: number;
  h: number;
  f: number;
  parent: GridCell | null;
}

export interface SimulationConfig {
  gridRows: number;
  gridCols: number;
  start: { row: number; col: number };
  goal: { row: number; col: number };
  allowDiagonal: boolean;
  animationSpeed: number;
}

export interface SimulationStats {
  pathLength: number;
  nodesExplored: number;
  computationTimeMs: number;
  pathFound: boolean;
}

export interface Point {
  row: number;
  col: number;
}
