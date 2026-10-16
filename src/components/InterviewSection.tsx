import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'What is the objective of your AI-Based Autonomous Navigation System project?',
    a: 'The objective is to build an AI system that enables a robot or autonomous vehicle to navigate from a start point to a destination without human intervention. It detects obstacles, plans an optimal path using A*, and moves safely within a simulated environment.',
  },
  {
    q: 'What real-world problem does this project solve?',
    a: 'It solves the problem of autonomous movement in dynamic environments. It is used in self-driving cars, warehouse robots, delivery bots, and drones where systems must move intelligently without manual control.',
  },
  {
    q: 'What technologies did you use in this project?',
    a: 'I used Python-grade algorithms (A*, Dijkstra, BFS) implemented in TypeScript, with React and HTML Canvas for the interactive visualization. The simulation runs entirely in the browser with no backend required.',
  },
  {
    q: 'How does your system detect obstacles?',
    a: 'The system detects obstacles using a simulated grid environment where blocked cells represent obstacles. These positions are identified and avoided during path planning to ensure safe navigation. In a real deployment, this would use LIDAR, cameras, and ultrasonic sensors.',
  },
  {
    q: 'What path planning technique did you use and why?',
    a: 'I primarily used the A* algorithm because it efficiently finds the shortest path while considering obstacles. It combines the actual travel cost (g) with a heuristic estimate (h) to guide the search, making it faster than Dijkstra or BFS in most scenarios.',
  },
  {
    q: 'Why did you use simulation instead of real hardware?',
    a: 'Simulation allows us to demonstrate the complete navigation logic without requiring expensive hardware like sensors, robots, or vehicles. It is more practical for learning and showcasing the concept, and the algorithms transfer directly to real-world deployment.',
  },
  {
    q: 'What challenges did you face in this project?',
    a: 'The main challenges were handling obstacle positioning, ensuring accurate path generation, managing diagonal movement without cutting through walls, and animating the exploration process smoothly for visualization.',
  },
  {
    q: 'How can this project be improved further?',
    a: 'It can be enhanced by adding real-time object detection with YOLO, camera input, lane detection, reinforcement learning for dynamic environments, and integration with advanced simulators like CARLA or ROS for full robotics deployment.',
  },
  {
    q: 'What is the difference between A*, Dijkstra, and BFS?',
    a: 'A* uses a heuristic to guide the search toward the goal, making it the most efficient. Dijkstra explores equally in all directions (no heuristic) but guarantees the shortest path. BFS explores level by level and works well on unweighted grids but explores more nodes.',
  },
  {
    q: 'How would you explain this project to HR in simple language?',
    a: 'I built an AI system that helps a virtual robot or vehicle move from one place to another safely by detecting obstacles and choosing the best path automatically, similar to how self-driving systems work. The simulation shows the AI thinking and navigating in real-time.',
  },
];

export default function InterviewSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="interview" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Interview Ready</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">Common Interview Questions & Answers</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Be prepared to explain every part of this project. These are the most likely questions
            a recruiter or technical interviewer will ask.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-all ${
                open === i ? 'border-sky-300 bg-white shadow-md' : 'border-slate-200 bg-white'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    open === i ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Q{i + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{faq.q}</span>
                </span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 pl-14">
                  <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-800">Resume Bullet Points</h3>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-500">
              <li className="border-l-2 border-sky-400 pl-2">Built an AI-based autonomous navigation system implementing A*, Dijkstra, and BFS path planning algorithms with real-time visualization in an interactive grid simulation.</li>
              <li className="border-l-2 border-green-400 pl-2">Designed a modular perception-to-navigation pipeline (obstacle detection, path planning, agent control) mirroring real-world autonomous vehicle architecture.</li>
              <li className="border-l-2 border-amber-400 pl-2">Optimized path planning performance with heuristic-guided search, achieving sub-millisecond computation times on 30x30 grids with dynamic obstacle layouts.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-800">LinkedIn Summary</h3>
            <p className="text-xs leading-relaxed text-slate-500">
              Developed an AI-Based Autonomous Navigation System that simulates how self-driving cars and warehouse robots navigate autonomously. Implemented A*, Dijkstra, and BFS algorithms for path planning with real-time obstacle avoidance visualization. The project demonstrates the complete perception-to-control pipeline used in autonomous vehicles — from reading the environment to planning an optimal path and executing navigation. Built entirely as a virtual simulation, making it accessible without physical hardware.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-800">Industry Relevance</h3>
            <p className="text-xs leading-relaxed text-slate-500">
              Companies like Tesla, Waymo, NVIDIA, Amazon (warehouse robots), Uber ATG, and Tata Motors use similar navigation pipelines for autonomous vehicles, delivery robots, and industrial automation. This project demonstrates the core algorithms that power real autonomous systems at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
