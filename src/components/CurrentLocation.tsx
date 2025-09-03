// src/components/CurrentLocation.tsx
import { useMemo } from "react";
import { useNow } from "../hooks/useNow";
import { getBrowserTimeZone } from "../utils/time";
import cities from "../data/cities.json";
import type { City } from "../types/models";
import TimeBadge from "./TimeBadge";

// Pick a representative city for the user's time zone (closest match from dataset)
function pickCityForTimeZone(tz: string): City | null {
  const match = (cities as City[]).find((c) => c.timezone === tz);
  if (match) return match;

  // fallback: if no exact match, try prefix match on region, else return first
  const region = tz.split("/")[0];
  const regionMatch = (cities as City[]).find((c) =>
    c.timezone.startsWith(region + "/")
  );
  return regionMatch ?? null;
}

function CurrentLocation() {
  const now = useNow(1000);
  const tz = useMemo(() => getBrowserTimeZone(), []);
  const city = useMemo(() => pickCityForTimeZone(tz), [tz]);

  if (!city) return null;

  return (
    <section aria-label="Current location time">
      <TimeSectionTitle title="Your location" />
      <TimeRow city={city} now={now} />
    </section>
  );
}

export default CurrentLocation;

// --- local helpers for UI ---

function TimeSectionTitle({ title }: { title: string }) {
  return <h3 style={{ margin: "16px 0 8px" }}>{title}</h3>;
}

function TimeRow({ city, now }: { city: City; now: Date }) {
  return (
    <TimeBadge
      id={city.id}
      cityName={city.name}
      country={city.country}
      timezone={city.timezone}
      now={now}
    />
  );
}
