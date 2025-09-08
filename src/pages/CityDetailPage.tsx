import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import cities from "../data/cities.json";
import type { City } from "../types/models";
import { formatLocalTime } from "../utils/time";
import { useNow } from "../hooks/useNow";
import { loadCities } from "../utils/localStorage";  // Komma åt egna tillagda städer
import "../styles/CityDetailPage.css";
import fallbackImage from "../assets/world.jpg"; // 👈 Lägg en neutral bild i assets-mappen

// Analog clock component
function AnalogClock({ now, timezone }: { now: Date; timezone: string }) {
  const local = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

  const seconds = local.getSeconds();
  const minutes = local.getMinutes();
  const hours = local.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

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

  // 👇 kombinera JSON-städerna med de från localStorage
  const allCities: City[] = [
    ...(cities as City[]),
    ...loadCities(),
  ];

  const city = allCities.find((c) => c.id === id);
  const storageKey = `clockType-${id}`;

  const [clockType, setClockType] = useState<"digital" | "analog">("digital");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as "digital" | "analog" | null;
    if (saved) setClockType(saved);
  }, [storageKey]);

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

  const backgroundImage = city.imageUrl && city.imageUrl.trim() !== ""
    ? city.imageUrl
    : fallbackImage;
  
  return (
    <div
      className="city-detail"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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

        <div className="clock-toggle">
          <button
            onClick={() => setClockType("digital")}
            className={clockType === "digital" ? "active" : ""}
            aria-label="Show digital clock"
          >
            🖥️
          </button>
          <button
            onClick={() => setClockType("analog")}
            className={clockType === "analog" ? "active" : ""}
            aria-label="Show analog clock"
          >
            🕒
          </button>
        </div>

        {clockType === "digital" ? (
          <p style={{ fontSize: "2rem" }}>
            {formatLocalTime(
              city.timezone,
              { hour: "2-digit", minute: "2-digit", second: "2-digit" },
              now
            )}
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
