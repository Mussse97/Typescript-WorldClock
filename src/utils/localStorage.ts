
import type { City } from "../types/models";

const STORAGE_KEY = "worldclock:selectedCities";

export function saveCities(cities: City[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function loadCities(): City[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as City[];
  } catch {
    return [];
  }
}
