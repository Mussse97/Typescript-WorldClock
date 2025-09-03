// src/types/models.ts
export type TimeFormat = "digital" | "analog"; // future-proofing


export interface City {
id: string; // slug or uuid
name: string; // e.g., "Stockholm"
country: string; // e.g., "Sweden"
timezone: TimeZone; // string literal type below
coordinates?: { lat: number; lng: number }; // optional for later map
imageUrl?: string; // used on detail page later
}


// String literal types for time zones we include in our dataset.
// You can expand this list as you add more cities.
export type TimeZone =
| "Europe/Stockholm"
| "Europe/London"
| "Europe/Paris"
| "Europe/Berlin"
| "America/New_York"
| "America/Los_Angeles"
| "America/Chicago"
| "America/Sao_Paulo"
| "Asia/Tokyo"
| "Asia/Shanghai"
| "Asia/Dubai"
| "Asia/Kolkata"
| "Australia/Sydney"
| "Africa/Johannesburg";


export interface ClockSettings {
format: TimeFormat; // digital or analog (we render digital for MVP)
showSeconds: boolean;
}