// src/pages/CityDetailPage.tsx
import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import cities from "../data/cities.json";
import type { City } from "../types/models";
import { formatLocalTime } from "../utils/time";
import { useNow } from "../hooks/useNow";
import "../styles/CityDetailPage.css";

// AnalogClock-komponent
function AnalogClock({ now, timezone }: { now: Date; timezone: string }) {
  // konvertera till stadens tid
  const local = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  const seconds = local.getSeconds();
  const minutes = local.getMinutes();
  const hours = local.getHours();

  const secDeg = seconds * 6; // 360 / 60
  const minDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5; // 360/12 + minute offset

  return (
    <div className="analog-clock">
      <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
      <div className="hand minute" style={{ transform: `rotate(${minDeg}deg)` }} />
      <div className="hand second" style={{ transform: `rotate(${secDeg}deg)` }} />
      <div className="center-dot" />
    </div>
  );
}

function CityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const now = useNow(1000);

  const city = (cities as City[]).find((c) => c.id === id);
  const storageKey = `clockType-${id}`;

  const [clockType, setClockType] = useState<"digital" | "analog">("digital");

  // Ladda från localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as "digital" | "analog" | null;
    if (saved) setClockType(saved);
  }, [storageKey]);

  // Spara i localStorage när användaren ändrar
  useEffect(() => {
    localStorage.setItem(storageKey, clockType);
  }, [clockType, storageKey]);

  if (!city) {
    return (
      <div className="container">
        <h2>City not found</h2>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  return (
    <div
      className="city-detail"
      style={{
        backgroundImage: `url(${city.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
      }}
    >
      <div className="overlay">
        <h1>
          {city.name}, {city.country}
        </h1>

        {/* Toggle knappar */}
        <div className="clock-toggle">
          <button
            onClick={() => setClockType("digital")}
            className={clockType === "digital" ? "active" : ""}
            aria-label="Show digital clock"
          >
            {/* Din digital-ikon SVG här */}
            🖥️
          </button>
          <button
            onClick={() => setClockType("analog")}
            className={clockType === "analog" ? "active" : ""}
            aria-label="Show analog clock"
          >
            {/* Din analog-ikon SVG här */}
            🕒
          </button>
        </div>

        {/* Rendera klockan */}
        {clockType === "digital" ? (
          <p style={{ fontSize: "2rem" }}>
            {formatLocalTime(city.timezone, {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }, now)}
          </p>
        ) : (
          <AnalogClock now={now} timezone={city.timezone} />
        )}

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default CityDetailPage;
