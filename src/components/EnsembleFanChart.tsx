"use client";

import { useMemo } from "react";
import { useWeatherStore } from "@/lib/store";
import { generateEnsembleForecast } from "@/lib/weather-data";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { BarChart2, Info } from "lucide-react";

export default function EnsembleFanChart() {
  const { selectedLocation } = useWeatherStore();
  const loc = selectedLocation || { lat: 40.71, lng: -74.01, name: "New York" };
  const forecast = useMemo(() => generateEnsembleForecast(loc.lat, loc.lng, 30, 10), [loc.lat, loc.lng]);

  const chartData = forecast.map((f) => ({
    date: f.date,
    mean: Math.round(f.mean * 10) / 10,
    p10: Math.round(f.p10 * 10) / 10,
    p25: Math.round(f.p25 * 10) / 10,
    p75: Math.round(f.p75 * 10) / 10,
    p90: Math.round(f.p90 * 10) / 10,
    range10_90: [Math.round(f.p10 * 10) / 10, Math.round(f.p90 * 10) / 10],
    range25_75: [Math.round(f.p25 * 10) / 10, Math.round(f.p75 * 10) / 10],
  }));

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart2 size={22} className="text-blue-400" /> Ensemble Fan Chart
        </h2>
        <p className="text-sm text-slate-400">{loc.name} - 30 ensemble members, 10-day forecast</p>
      </div>

      <div className="glass-panel p-4 flex items-start gap-3">
        <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400">
          Fan charts show forecast uncertainty. The darker band (25th-75th percentile) captures the most likely outcomes.
          The lighter band (10th-90th percentile) shows the wider range of possibilities.
        </p>
      </div>

      {/* Fan Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Temperature Forecast with Uncertainty (C)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(v) => new Date(v).toLocaleDateString("en", { month: "short", day: "numeric" })}
            />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area type="monotone" dataKey="p90" stroke="none" fill="#3b82f6" fillOpacity={0.1} name="90th pct" />
            <Area type="monotone" dataKey="p75" stroke="none" fill="#3b82f6" fillOpacity={0.15} name="75th pct" />
            <Area type="monotone" dataKey="p25" stroke="none" fill="#3b82f6" fillOpacity={0.15} name="25th pct" />
            <Area type="monotone" dataKey="p10" stroke="none" fill="#3b82f6" fillOpacity={0.1} name="10th pct" />
            <Line type="monotone" dataKey="mean" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="Mean" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Summary */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Daily Summary</h3>
        <div className="space-y-2">
          {forecast.map((f, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-800 last:border-0">
              <div className="w-20 text-xs text-slate-400">
                {new Date(f.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
              </div>
              <div className="text-sm font-mono text-white w-12">{f.mean.toFixed(1)}°</div>
              <div className="flex-1 relative h-4 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-blue-500/30 rounded-full"
                  style={{ left: `${((f.p10 + 10) / 50) * 100}%`, right: `${100 - ((f.p90 + 10) / 50) * 100}%` }}
                />
                <div
                  className="absolute h-full bg-blue-500/50 rounded-full"
                  style={{ left: `${((f.p25 + 10) / 50) * 100}%`, right: `${100 - ((f.p75 + 10) / 50) * 100}%` }}
                />
                <div
                  className="absolute top-0.5 w-1.5 h-3 bg-amber-400 rounded-full"
                  style={{ left: `${((f.mean + 10) / 50) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 w-24">{f.p10.toFixed(0)} - {f.p90.toFixed(0)}°C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
