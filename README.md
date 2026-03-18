# WeatherNow

Probabilistic weather forecasting platform with ensemble models, hurricane tracking, spaghetti plots, and alert systems.

## Features

- **Ensemble Fan Charts** -- Visualize forecast uncertainty with probabilistic ensemble spreads
- **Hurricane Tracker** -- Track active tropical storms with cone-of-uncertainty projections
- **Probability Maps** -- Precipitation, temperature, and severe weather probability overlays
- **Spaghetti Plots** -- Compare diverging model runs for forecast confidence assessment
- **Alert System** -- Configurable weather alerts for severe conditions
- **Interactive Map** -- Mapbox-powered geographic data visualization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mapping:** Mapbox GL
- **Charts:** Recharts
- **State Management:** Zustand
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd weathernow
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
weathernow/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── EnsembleFanChart.tsx
│   │   ├── HurricaneTracker.tsx
│   │   ├── ProbabilityMaps.tsx
│   │   ├── SpaghettiPlots.tsx
│   │   └── AlertSystem.tsx
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

