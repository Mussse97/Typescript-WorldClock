import { useState } from "react";
import type { CityDraft } from "../types/models";

interface AddCityFormProps {
  onAdd: (city: CityDraft) => void;
}

export default function AddCityForm({ onAdd }: AddCityFormProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");

  // Alla stödja tidszoner
  const timezones = Intl.supportedValuesOf("timeZone");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !timezone) return;

    const newCity: CityDraft = {
      name,
      country: country || "Custom",
      timezone,
    };

    onAdd(newCity);

    // Rensa formulärfält
    setName("");
    setCountry("");
    setTimezone("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-city-form">
      <input
        type="text"
        placeholder="City name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        required
      >
        <option value="">Select timezone</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <button type="submit">Add City</button>
    </form>
  );
}
