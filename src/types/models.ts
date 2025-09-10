
export type TimeFormat = "digital" | "analog"; 


export interface City {
id: string; 
name: string; 
country: string; 
timezone: string; // string literal type below
coordinates?: { lat: number; lng: number }; // might use for map feature later
imageUrl?: string; 

}
// Utility type: used when adding a new city (not all fields required but some is)
export type CityDraft = Pick<City, "name" | "country" | "timezone">; 


// Type guard
export function isCity(obj: unknown): obj is City {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&  
    "name" in obj &&
    "timezone" in obj
  );
}

// String literal types for time zones we include in our dataset.
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
format: TimeFormat; // digital or analog 
showSeconds: boolean;
}