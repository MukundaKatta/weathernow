"use client";

import { useMemo } from "react";
import { generateAlerts } from "@/lib/weather-data";
import { AlertTriangle, Bell, Clock, MapPin } from "lucide-react";

const sevConfig: Record<string, { color: string; bg: string }> = {
  extreme: { color: "text-red-400", bg: "bg-red-500/20 border-red-500/40" },
  severe: { color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/40" },
  moderate: { color: "text-yellow-400", bg: "bg-yellow-500/20 border-yellow-500/40" },
  minor: { color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/40" },
};

export default function AlertSystem() {
  const alerts = useMemo(() => generateAlerts(), []);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell size={22} className="text-amber-400" /> Alert System
          </h2>
          <p className="text-sm text-slate-400">{alerts.length} active weather alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {["extreme", "severe", "moderate", "minor"].map((sev) => {
          const count = alerts.filter((a) => a.severity === sev).length;
          const cfg = sevConfig[sev];
          return (
            <div key={sev} className={`glass-panel p-4 text-center border ${cfg.bg}`}>
              <div className={`text-2xl font-bold ${cfg.color}`}>{count}</div>
              <div className="text-xs text-slate-500 capitalize">{sev}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {alerts.sort((a, b) => {
          const order = { extreme: 0, severe: 1, moderate: 2, minor: 3 };
          return order[a.severity] - order[b.severity];
        }).map((alert) => {
          const cfg = sevConfig[alert.severity];
          const expiresIn = Math.max(0, Math.round((new Date(alert.expires).getTime() - Date.now()) / 3600000));

          return (
            <div key={alert.id} className={`glass-panel p-5 border ${cfg.bg}`}>
              <div className="flex items-start gap-4">
                <AlertTriangle size={20} className={cfg.color} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${cfg.bg} ${cfg.color}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-slate-500">{alert.type}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{alert.headline}</h3>
                  <p className="text-xs text-slate-400">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12} />{alert.area}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />Expires in {expiresIn}h</span>
                    <span>Confidence: {alert.probability}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
