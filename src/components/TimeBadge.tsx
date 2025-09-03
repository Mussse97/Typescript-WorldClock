// src/components/TimeBadge.tsx
import React from "react";
import { formatLocalTime } from "../utils/time";


interface TimeBadgeProps {
cityName: string;
country: string;
timezone: string; // accepting string to be flexible in UI
now: Date; // derived from useNow() so re-render each second
}


const TimeBadge: React.FC<TimeBadgeProps> = ({ cityName, country, timezone }) => {
return (
<div className="card" aria-live="polite">
<h2 style={{ margin: "0 0 4px" }}>{cityName}, {country}</h2>
<div style={{ fontSize: 28, fontVariantNumeric: "tabular-nums" }}>
{formatLocalTime(timezone, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
</div>
<div style={{ opacity: .7, marginTop: 4 }}>{timezone}</div>
</div>
);
};


export default TimeBadge;