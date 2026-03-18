import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherNow - Probabilistic Weather Forecasting",
  description: "Ensemble forecasts, hurricane tracking, probability maps, spaghetti plots, and alert system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><link href="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css" rel="stylesheet" /></head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
