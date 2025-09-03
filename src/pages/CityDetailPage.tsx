// src/pages/CityDetailPage.tsx
import React from "react";
import { useParams, Link } from "react-router";
import cities from "../data/cities.json";
import type { City } from "../types/models";
import { formatLocalTime } from "../utils/time";


const CityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  

  const city = (cities as City[]).find((c) => c.id === id);

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
        // backgroundImage: `url(${city.image})`,
        backgroundColor: "#333",
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
        <p style={{ fontSize: "2rem" }}>
          {formatLocalTime(city.timezone, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CityDetailPage;
