# AI-Based Autonomous Navigation System

An interactive AI-driven navigation simulator built with React, TypeScript, and Vite. This project visualizes how autonomous agents plan paths in a grid environment using classic search algorithms such as A*, Dijkstra, and BFS.

The application lets users configure the environment, add obstacles, choose an algorithm, and watch the robot explore and navigate to a goal in real time.

## Features

- Interactive grid-based simulation environment
- Start and goal placement with obstacle editing tools
- Algorithm selection for path planning
- A* search, Dijkstra, and BFS support
- Diagonal movement toggle
- Animation speed controls
- Maze and random map generation presets
- Real-time statistics for explored nodes, path length, and runtime behavior
- Responsive UI for desktop and mobile layouts

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- HTML5 Canvas-based simulation rendering
- Lucide React icons

## Project Structure

- src/App.tsx: Main application layout and simulation orchestration
- src/components: UI components for the simulator, controls, workflow, architecture, and content sections
- src/lib: Logic helpers and simulation utilities
- src/types: Shared TypeScript types
- src/index.css: Application styling

## Simulation Workflow

1. Set the map size and environment preset.
2. Place obstacles, start point, and goal point.
3. Select a navigation algorithm.
4. Run the simulation to visualize exploration and pathfinding.
5. Review path efficiency and algorithm metrics.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Sakshi-2006/AI-Based-Autonomous-Navigation-System.git
cd AI-Based-Autonomous-Navigation-System
```

Install dependencies:

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The development server will start and provide a local URL for the app.

### Build for production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Type checking

```bash
npm run typecheck
```

## Available Algorithms

### A*

A heuristic-based pathfinding algorithm that efficiently finds the shortest path while prioritizing promising nodes.

### Dijkstra

A shortest-path algorithm that explores nodes by cumulative cost and is useful for weighted pathfinding.

### BFS

A breadth-first traversal algorithm that finds the shortest path in an unweighted grid.

## Use Cases

This project is suitable for demonstrating:

- Autonomous navigation concepts
- Search algorithm comparison
- Grid-based path planning
- AI and robotics education
- Portfolio and research visualization

## Screenshots

The interface includes:

- a top navigation bar
- a live simulation area
- a control panel for algorithm and grid settings
- dashboard metrics for performance analysis
- educational sections explaining workflow, architecture, and future ideas

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run validation checks.
5. Open a pull request with a clear description of the update.

## License

This project does not currently include a license file. If you plan to distribute or reuse the project publicly, add an appropriate open-source license such as MIT and reference it here.

## Contact

For questions or collaboration, visit the repository:

https://github.com/Sakshi-2006/AI-Based-Autonomous-Navigation-System
