"use client";

import { useMemo } from "react";
import { useWeatherStore } from "@/lib/store";
import { generateSpaghettiPlots } from "@/lib/weather-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GitBranch } from "lucide-react";

export default function SpaghettiPlots() {
  const { selectedLocation } = useWeatherStore();
  const loc = selectedLocation || { lat: 40.71, lng: -74.01, name: "New York" };
  const models = useMemo(() => generateSpaghettiPlots(loc.lat, 10, 8), [loc.lat]);

  // Merge data for chart
  const chartData = Array.from({ length: 10 }, (_, d) => {
    const row: any = { day: `Day ${d + 1}` };
    models.forEach((m) => { row[m.name] = Math.round(m.data[d].temp * 10) / 10; });
    return row;
  });

  const spread = models.map((m) => m.data.map((d) => d.temp));
  const maxSpread = Array.from({ length: 10 }, (_, d) => {
    const vals = spread.map((s) => s[d]);
    return Math.round((Math.max(...vals) - Math.min(...vals)) * 10) / 10;
  });

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <GitBranch size={22} className="text-purple-400" /> Spaghetti Plots
        </h2>
        <p className="text-sm text-slate-400">{loc.name} - Multi-model temperature comparison</p>
      </div>

      {/* Model Legend */}
      <div className="flex flex-wrap gap-3">
        {models.map((m) => (
          <div key={m.name} className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded" style={{ backgroundColor: m.color }} />
            <span className="text-xs text-slate-400">{m.name}</span>
          </div>
        ))}
      </div>

      {/* Spaghetti Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Temperature Forecast by Model (C)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            {models.map((m) => (
              <Line key={m.name} type="monotone" dataKey={m.name} stroke={m.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Model Spread */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Model Spread (Disagreement)</h3>
        <div className="space-y-2">
          {maxSpread.map((s, d) => (
            <div key={d} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-12">Day {d + 1}</span>
              <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, s * 8)}%`,
                    backgroundColor: s > 8 ? "#ef4444" : s > 5 ? "#f59e0b" : "#22c55e",
                  }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 w-12">{s}°C</span>
            </div>
          ))}
        </div>
      </div>

      {/* Model Rankings */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Model Details</h3>
        <div className="grid grid-cols-4 gap-3">
          {models.map((m) => {
            const avgTemp = Math.round(m.data.reduce((s, d) => s + d.temp, 0) / m.data.length * 10) / 10;
            return (
              <div key={m.name} className="bg-slate-800/50 rounded-lg p-3 text-center">
                <div className="text-xs font-medium" style={{ color: m.color }}>{m.name}</div>
                <div className="text-lg font-bold text-white mt-1">{avgTemp}°</div>
                <div className="text-[10px] text-slate-500">Avg forecast</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
