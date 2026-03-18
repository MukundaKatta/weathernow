"use client";

import { useMemo } from "react";
import { generateHurricanes, HurricaneTrack } from "@/lib/weather-data";
import { Wind, AlertTriangle, MapPin, Clock } from "lucide-react";

const categoryColors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#dc2626", "#881337"];

export default function HurricaneTracker() {
  const hurricanes = useMemo(() => generateHurricanes(), []);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Wind size={22} className="text-cyan-400" /> Hurricane Tracker
        </h2>
        <p className="text-sm text-slate-400">{hurricanes.length} active systems being tracked</p>
      </div>

      {/* Category Legend */}
      <div className="flex gap-2">
        {["TD", "TS", "Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"].map((cat, i) => (
          <div key={i} className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[Math.min(i, 5)] }} />
            <span className="text-slate-400">{cat}</span>
          </div>
        ))}
      </div>

      {hurricanes.map((h) => (
        <div key={h.id} className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{h.name}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm">
                <span className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ backgroundColor: categoryColors[h.category] + "30", color: categoryColors[h.category] }}
                >
                  Category {h.category}
                </span>
                <span className="text-slate-400">{h.windSpeed} mph</span>
                <span className="text-slate-400">{h.pressure} mb</span>
              </div>
            </div>
            <AlertTriangle size={24} className="text-amber-400" />
          </div>

          {/* Track points */}
          <div>
            <h4 className="text-xs text-slate-500 mb-2">Track History</h4>
            <div className="flex gap-1 overflow-x-auto pb-2">
              {h.points.map((p, i) => (
                <div key={i} className="flex-shrink-0 w-16 text-center">
                  <div className="w-4 h-4 mx-auto rounded-full mb-1"
                    style={{ backgroundColor: categoryColors[p.category] }}
                  />
                  <div className="text-[10px] text-slate-400">
                    {new Date(p.time).toLocaleTimeString("en", { hour: "2-digit" })}
                  </div>
                  <div className="text-[10px] text-slate-500">{p.wind.toFixed(0)}mph</div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast cone info */}
          <div>
            <h4 className="text-xs text-slate-500 mb-2">Uncertainty Cone</h4>
            <div className="grid grid-cols-4 gap-2">
              {h.cone.slice(0, 4).map((c, i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <div className="text-xs text-white">{c.radius}km</div>
                  <div className="text-[10px] text-slate-500">+{(i + 1) * 24}h</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Position */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin size={12} />
            <span>
              Current: {h.points[h.points.length - 1].lat.toFixed(1)}N, {Math.abs(h.points[h.points.length - 1].lng).toFixed(1)}W
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
