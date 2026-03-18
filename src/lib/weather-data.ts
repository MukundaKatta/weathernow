export function generateEnsembleForecast(lat: number, lng: number, members: number = 20, days: number = 10) {
  const base = 20 - Math.abs(lat) * 0.3;
  const forecasts: { day: number; date: string; members: number[]; mean: number; p10: number; p25: number; p75: number; p90: number }[] = [];

  for (let d = 0; d < days; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    const spread = 1 + d * 0.5;
    const dayTemp = base + Math.sin(d * 0.5) * 3;
    const memberTemps = Array.from({ length: members }, () =>
      dayTemp + (Math.random() - 0.5) * spread * 2 + (Math.random() - 0.5) * 4
    ).sort((a, b) => a - b);

    const mean = memberTemps.reduce((s, v) => s + v, 0) / members;
    const p10 = memberTemps[Math.floor(members * 0.1)];
    const p25 = memberTemps[Math.floor(members * 0.25)];
    const p75 = memberTemps[Math.floor(members * 0.75)];
    const p90 = memberTemps[Math.floor(members * 0.9)];

    forecasts.push({ day: d, date: date.toISOString().split("T")[0], members: memberTemps, mean, p10, p25, p75, p90 });
  }
  return forecasts;
}

export interface HurricaneTrack {
  id: string;
  name: string;
  category: number;
  windSpeed: number;
  pressure: number;
  points: { lat: number; lng: number; time: string; category: number; wind: number }[];
  cone: { lat: number; lng: number; radius: number }[];
}

export function generateHurricanes(): HurricaneTrack[] {
  return [
    {
      id: "h1",
      name: "Hurricane Delta",
      category: 3,
      windSpeed: 120,
      pressure: 960,
      points: Array.from({ length: 12 }, (_, i) => ({
        lat: 18 + i * 1.2 + (Math.random() - 0.5) * 0.5,
        lng: -65 - i * 2.5 + (Math.random() - 0.5) * 1,
        time: new Date(Date.now() - (12 - i) * 6 * 3600000).toISOString(),
        category: Math.min(5, Math.max(1, 3 + Math.floor((Math.random() - 0.3) * 2))),
        wind: 80 + i * 5 + Math.random() * 10,
      })),
      cone: Array.from({ length: 8 }, (_, i) => ({
        lat: 28 + i * 1.5,
        lng: -85 - i * 1,
        radius: 50 + i * 30,
      })),
    },
    {
      id: "h2",
      name: "Tropical Storm Echo",
      category: 1,
      windSpeed: 75,
      pressure: 990,
      points: Array.from({ length: 8 }, (_, i) => ({
        lat: 15 + i * 1.5,
        lng: -30 - i * 3,
        time: new Date(Date.now() - (8 - i) * 6 * 3600000).toISOString(),
        category: 1,
        wind: 60 + i * 3,
      })),
      cone: Array.from({ length: 5 }, (_, i) => ({
        lat: 25 + i * 2,
        lng: -55 - i * 2,
        radius: 40 + i * 25,
      })),
    },
  ];
}

export function generateSpaghettiPlots(lat: number, days: number = 10, models: number = 8) {
  const base = 20 - Math.abs(lat) * 0.3;
  const modelNames = ["GFS", "ECMWF", "CMC", "UKMO", "ICON", "JMA", "NAM", "HRRR"];
  const modelColors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"];

  return modelNames.slice(0, models).map((name, mi) => ({
    name,
    color: modelColors[mi],
    data: Array.from({ length: days }, (_, d) => ({
      day: d,
      temp: base + Math.sin(d * 0.6 + mi * 0.3) * 4 + (Math.random() - 0.5) * 3 + mi * 0.5,
    })),
  }));
}

export function generateProbabilityData(): { type: string; probability: number; region: string; severity: string }[] {
  return [
    { type: "Rain > 25mm", probability: 72, region: "Northeast", severity: "moderate" },
    { type: "Snow > 10cm", probability: 15, region: "Midwest", severity: "low" },
    { type: "Temp > 35C", probability: 85, region: "Southwest", severity: "high" },
    { type: "Wind > 80km/h", probability: 35, region: "Gulf Coast", severity: "moderate" },
    { type: "Hail", probability: 22, region: "Central Plains", severity: "moderate" },
    { type: "Fog", probability: 55, region: "Pacific Coast", severity: "low" },
    { type: "Tornado", probability: 8, region: "Tornado Alley", severity: "extreme" },
    { type: "Flooding", probability: 45, region: "Southeast", severity: "high" },
  ];
}

export interface WeatherAlert {
  id: string;
  type: string;
  severity: "extreme" | "severe" | "moderate" | "minor";
  headline: string;
  description: string;
  area: string;
  onset: string;
  expires: string;
  probability: number;
}

export function generateAlerts(): WeatherAlert[] {
  return [
    { id: "a1", type: "Tornado Watch", severity: "extreme", headline: "Tornado Watch in effect", description: "Conditions favorable for tornado development. Large hail and damaging winds also possible.", area: "Central Oklahoma", onset: new Date().toISOString(), expires: new Date(Date.now() + 8 * 3600000).toISOString(), probability: 45 },
    { id: "a2", type: "Flash Flood Warning", severity: "severe", headline: "Flash Flood Warning", description: "Heavy rainfall rates of 2-3 inches per hour expected. Flash flooding imminent.", area: "Houston Metro", onset: new Date().toISOString(), expires: new Date(Date.now() + 4 * 3600000).toISOString(), probability: 80 },
    { id: "a3", type: "Heat Advisory", severity: "moderate", headline: "Excessive Heat Advisory", description: "Heat index values up to 110F expected. Stay hydrated.", area: "Phoenix Metro", onset: new Date().toISOString(), expires: new Date(Date.now() + 12 * 3600000).toISOString(), probability: 95 },
    { id: "a4", type: "Winter Storm Warning", severity: "severe", headline: "Winter Storm Warning", description: "Heavy snow expected. 8-12 inches possible with blowing and drifting.", area: "Northern Minnesota", onset: new Date().toISOString(), expires: new Date(Date.now() + 24 * 3600000).toISOString(), probability: 70 },
  ];
}
