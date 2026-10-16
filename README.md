# AI-Based Autonomous Navigation System

An interactive AI-driven navigation simulator implemented with React, TypeScript, and Vite. This project demonstrates grid-based autonomous navigation and path-planning algorithms with a live, browser-based visualization and controls.

Live demo

- Hosted demo: https://ai-autonomous-naviga-pim9.bolt.host

Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run locally](#run-locally)
  - [Build for production](#build-for-production)
- [Algorithms](#algorithms)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

Overview

This repository provides a modular, type-safe implementation of grid-based pathfinding and an interactive simulation used for education, research, and demonstrations. Users can configure maps, place obstacles, select algorithms, and watch how agents explore and compute paths to a goal.

Features

- Interactive grid-based simulation with obstacle editing
- Start and goal placement
- Algorithm selection: A*, Dijkstra, BFS
- Diagonal movement toggle and animation speed controls
- Maze and random map generation presets
- Real-time statistics: explored nodes, path length, runtime
- Responsive UI built with TypeScript and modern tooling

Tech stack

- Language: TypeScript (primary)
- Frontend: React + Vite
- Styling: Tailwind CSS
- Rendering: HTML5 Canvas for simulation visualization
- Icons: Lucide React (or similar)

Project structure (high level)

- README.md — project overview and instructions
- package.json — project scripts and dependencies
- src/ — core TypeScript source (components, simulation logic, helpers)
- src/components — UI components and controls
- src/lib — simulation and algorithm implementations
- src/types — shared TypeScript types
- public/ — static assets

Getting started

Prerequisites

- Node.js 18 or newer
- npm (or yarn)

Install

```bash
git clone https://github.com/Sakshi-2006/AI-Based-Autonomous-Navigation-System.git
cd AI-Based-Autonomous-Navigation-System
npm install
```

Run locally

```bash
npm run dev
```

Open the local URL printed by Vite (commonly http://localhost:5173) to view the app.

Build for production

```bash
npm run build
```

Algorithms

- A*: Heuristic-driven search for shortest path using an admissible heuristic.
- Dijkstra: Uniform-cost search for shortest path on weighted grids.
- BFS: Breadth-first search for shortest path on unweighted grids.

Usage

- Use the UI to configure grid size and presets, place the start and goal, add or remove obstacles, and select an algorithm.
- Start the simulation to watch the exploration and the path being constructed. Use speed controls to slow or accelerate the visualization.

Testing and quality

- Run unit tests (if configured) with `npm test`.
- Run linting and type checks with `npm run lint` and `npm run typecheck`.

Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/description`.
3. Implement changes and add tests where appropriate.
4. Run linting and tests locally.
5. Open a pull request with a clear description of the change.

License

This repository does not include a LICENSE file. If you intend to publish or reuse the project publicly, add an appropriate open-source license (for example, MIT) and reference it here.

Contact

For questions or collaboration, open an issue on the repository or visit the maintainer profile: https://github.com/Sakshi-2006
