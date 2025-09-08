import { useState } from "react";
import { saveCities, loadCities } from "../utils/localStorage";
import type { City } from "../types/models";

interface AddCityFormProps {
  onAdd: (city: City) => void;
}

function AddCityForm({ onAdd }: AddCityFormProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");

  const timezones = Intl.supportedValuesOf("timeZone"); // alla tillgängliga tidszoner

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !timezone) return;

    const newCity: City = {
      id: crypto.randomUUID(),
      name,
      country: country || "Custom",
      timezone,
    };

    // uppdatera localStorage direkt
    const saved = loadCities();
    const updated = [...saved, newCity];
    saveCities(updated);

    onAdd(newCity);
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
      <select value={timezone} onChange={(e) => setTimezone(e.target.value)} required>
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

export default AddCityForm;
