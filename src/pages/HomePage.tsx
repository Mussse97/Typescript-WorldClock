// src/pages/HomePage.tsx
import { useMemo, useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import TimeBadge from "../components/TimeBadge";
import CurrentLocation from "../components/CurrentLocation";
import AddCityForm from "../components/AddCityForm";

import cities from "../data/cities.json";
import type { CityDraft, City } from "../types/models";
import { usecurrentTime } from "../hooks/useCurrentTime";
import { saveCities, loadCities } from "../utils/localStorage";
import "../styles/globals.css";

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const currentTime = usecurrentTime(1000);

  // Load selected cities from localStorage
  useEffect(() => {
    const saved = loadCities();
    setSelectedCities(saved);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as City[];
    return (cities as City[]).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [query]);

  // adds city from AddCityForm
  function handleAddCity(cityDraft: CityDraft) {
    const newCity: City = {
      ...cityDraft,
      id: crypto.randomUUID(), // Generate id here
    };

    const updated = [...selectedCities, newCity];
    setSelectedCities(updated);
    saveCities(updated);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (results.length === 0) return;

    const cityToAdd = results[0];

    // stops duplicates
    if (!selectedCities.some((c) => c.id === cityToAdd.id)) {
      const newList = [...selectedCities, cityToAdd];
      setSelectedCities(newList);
      saveCities(newList);
    }
  }

  function removeCity(id: string) {
    const newList = selectedCities.filter((c) => c.id !== id);
    setSelectedCities(newList);
    saveCities(newList);
  }

  return (
    <div className="container">
      <h1 className="title">What time is it around the world?</h1>

      <SearchBar value={query} onChange={onChange} onSubmit={onSubmit} />

      
      <h2>Add your own city</h2>
      <AddCityForm onAdd={handleAddCity} />

      <CurrentLocation />

      <h2>Valda städer</h2>
      {selectedCities.length > 0 && (
        <section className="selected-cities">
          {selectedCities.map((city) => (
            <div key={city.id} className="city-card">
              <TimeBadge
                id={city.id}
                cityName={city.name}
                country={city.country}
                timezone={city.timezone}
                currentTime={currentTime}
                removable
                onRemove={() => removeCity(city.id)}
              />
            </div>
          ))}
        </section>
      )}

      {query && results.length > 0 && (
        <section className="results">
          {results.map((city) => (
            <TimeBadge
              key={city.id}
              id={city.id}
              cityName={city.name}
              country={city.country}
              timezone={city.timezone}
              currentTime={currentTime}
            />
          ))}
        </section>
      )}
    </div>
  );
}
