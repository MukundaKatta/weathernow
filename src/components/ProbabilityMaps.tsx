"use client";

import { useMemo } from "react";
import { generateProbabilityData } from "@/lib/weather-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Percent } from "lucide-react";

export default function ProbabilityMaps() {
  const data = useMemo(() => generateProbabilityData(), []);

  const sevColors: Record<string, string> = {
    extreme: "#dc2626", high: "#ef4444", moderate: "#f59e0b", low: "#22c55e",
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Percent size={22} className="text-amber-400" /> Probability Maps
        </h2>
        <p className="text-sm text-slate-400">Event probability forecasts across regions</p>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Event Probabilities (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis type="category" dataKey="type" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} width={100} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
              {data.map((d, i) => <Cell key={i} fill={sevColors[d.severity]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((d) => (
          <div key={d.type} className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{d.type}</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: sevColors[d.severity] + "30", color: sevColors[d.severity] }}>
                {d.severity}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{d.probability}%</div>
            <div className="text-xs text-slate-500 mt-1">{d.region}</div>
            <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${d.probability}%`, backgroundColor: sevColors[d.severity] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
