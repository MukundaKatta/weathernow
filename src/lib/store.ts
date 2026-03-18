import { create } from "zustand";

export type TabMode = "ensemble" | "hurricane" | "probability" | "spaghetti" | "alerts";

interface WeatherStore {
  tab: TabMode;
  setTab: (t: TabMode) => void;
  selectedLocation: { lat: number; lng: number; name: string } | null;
  setSelectedLocation: (loc: { lat: number; lng: number; name: string } | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  tab: "ensemble",
  setTab: (t) => set({ tab: t }),
  selectedLocation: { lat: 40.71, lng: -74.01, name: "New York, NY" },
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
}));
