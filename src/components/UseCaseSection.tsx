import { Bot, Car, Package, Plane, Building2, Truck } from 'lucide-react';

const useCases = [
  { icon: Car, title: 'Self-Driving Cars', desc: 'Tesla, Waymo, and Uber ATG use navigation pipelines for autonomous driving, lane detection, and traffic-aware routing.', color: 'text-red-600 bg-red-50' },
  { icon: Package, title: 'Warehouse Robots', desc: 'Amazon Kiva and Fetch robots navigate warehouse aisles to pick and move inventory autonomously.', color: 'text-amber-600 bg-amber-50' },
  { icon: Truck, title: 'Delivery Robots', desc: 'Starship Technologies and Nuro use path planning for last-mile delivery on sidewalks and roads.', color: 'text-green-600 bg-green-50' },
  { icon: Plane, title: 'Drones & UAVs', desc: 'Autonomous drones use the same A* algorithms for obstacle-aware flight paths in agriculture and surveying.', color: 'text-sky-600 bg-sky-50' },
  { icon: Building2, title: 'Industrial Safety', desc: 'Autonomous inspection robots in factories and power plants navigate hazardous environments safely.', color: 'text-purple-600 bg-purple-50' },
  { icon: Bot, title: 'Smart Mobility', desc: 'NVIDIA Drive and Tata Motors integrate navigation AI for smart city transport and connected vehicles.', color: 'text-indigo-600 bg-indigo-50' },
];

export default function UseCaseSection() {
  return (
    <section id="industry" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Real-World Impact</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">Where This Technology Is Used</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            The same algorithms powering this simulation are deployed across the autonomous
            vehicle and robotics industry. Here are the major application areas.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(uc => {
            const Icon = uc.icon;
            return (
              <div key={uc.title} className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-slate-300">
                <div className={`flex-shrink-0 rounded-xl p-3 ${uc.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-slate-800">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{uc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
