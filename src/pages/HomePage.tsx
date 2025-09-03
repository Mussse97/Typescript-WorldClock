// src/pages/HomePage.tsx
import React, { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import TimeBadge from "../components/TimeBadge";
import CurrentLocation from "../components/CurrentLocation";
import cities from "../data/cities.json";
import type { City } from "../types/models";
import { useNow } from "../hooks/useNow";
import "../styles/globals.css";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<City | null>(null);
  const now = useNow(1000);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as City[];
    return (cities as City[]).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (results.length > 0) setSelected(results[0]);
  };

  return (
    <div className="container">
      <h1 className="title">What time is it around the world?</h1>

      {/* sökfält */}
      <SearchBar value={query} onChange={onChange} onSubmit={onSubmit} />

      {/* användarens nuvarande plats */}
      <CurrentLocation />

      {/* sökresultat */}
      {results.length > 0 && (
        <div className="results">
          {results.map((city) => (
            <TimeBadge
              key={city.id}
              cityName={city.name}
              country={city.country}
              timezone={city.timezone}
              now={now}
            />
          ))}
        </div>
      )}

      {/* vald stad */}
      {selected && (
        <div className="selected">
          <h2>
            {selected.name}, {selected.country}
          </h2>
          <TimeBadge
            cityName={selected.name}
            country={selected.country}
            timezone={selected.timezone}
            now={now}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
