"use client";

import { useWeatherStore, TabMode } from "@/lib/store";
import EnsembleFanChart from "@/components/EnsembleFanChart";
import HurricaneTracker from "@/components/HurricaneTracker";
import ProbabilityMaps from "@/components/ProbabilityMaps";
import SpaghettiPlots from "@/components/SpaghettiPlots";
import AlertSystem from "@/components/AlertSystem";
import {
  CloudSun, BarChart2, Wind, Percent, GitBranch, Bell,
} from "lucide-react";

const tabs: { key: TabMode; label: string; icon: React.ReactNode }[] = [
  { key: "ensemble", label: "Ensemble", icon: <BarChart2 size={18} /> },
  { key: "hurricane", label: "Hurricanes", icon: <Wind size={18} /> },
  { key: "probability", label: "Probability", icon: <Percent size={18} /> },
  { key: "spaghetti", label: "Spaghetti", icon: <GitBranch size={18} /> },
  { key: "alerts", label: "Alerts", icon: <Bell size={18} /> },
];

export default function HomePage() {
  const { tab, setTab } = useWeatherStore();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 h-full glass-panel flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <CloudSun size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">WeatherNow</h1>
              <p className="text-xs text-slate-400">Probabilistic Forecasting</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                tab === t.key ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "text-slate-400 hover:bg-slate-800/50"
              }`}
            >
              {t.icon}
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-500">Live forecast data</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-hidden">
        {tab === "ensemble" && <EnsembleFanChart />}
        {tab === "hurricane" && <HurricaneTracker />}
        {tab === "probability" && <ProbabilityMaps />}
        {tab === "spaghetti" && <SpaghettiPlots />}
        {tab === "alerts" && <AlertSystem />}
      </div>
    </div>
  );
}
