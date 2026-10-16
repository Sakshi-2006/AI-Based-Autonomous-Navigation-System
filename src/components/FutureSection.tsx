import { Rocket, TrendingUp, Cloud, Camera, Brain, Boxes } from 'lucide-react';

const improvements = [
  { icon: Camera, title: 'Real-Time Camera Input', desc: 'Replace the simulated grid with live camera feed. Use OpenCV to process frames and detect obstacles in real-world environments.' },
  { icon: Boxes, title: 'ROS Integration', desc: 'Port the navigation logic to the Robot Operating System (ROS) for deployment on physical robots with sensor integration.' },
  { icon: Rocket, title: 'CARLA Simulator', desc: 'Upgrade to CARLA, a professional autonomous driving simulator with realistic 3D environments, traffic, and weather conditions.' },
  { icon: Brain, title: 'Reinforcement Learning', desc: 'Train an RL agent (DQN / PPO) to learn navigation strategies in dynamic environments with moving obstacles.' },
  { icon: TrendingUp, title: 'SLAM', desc: 'Implement Simultaneous Localization and Mapping so the agent can build a map of an unknown environment while navigating it.' },
  { icon: Cloud, title: 'IoT & Cloud Dashboard', desc: 'Stream sensor data to a cloud dashboard for remote monitoring, fleet management, and analytics.' },
];

export default function FutureSection() {
  return (
    <section id="future" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Roadmap</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">Future Improvements</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            This project is a foundation. Here are the upgrade paths that take it from a
            student portfolio project to a production-grade autonomous system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {improvements.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 transition-all hover:shadow-lg hover:border-sky-200">
                <div className="mb-4 inline-flex rounded-xl bg-sky-50 p-3 text-sky-600 transition-all group-hover:bg-sky-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
