// src/utils/time.ts
export function formatLocalTime(
tz: string,
opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" }
): string {
return new Date().toLocaleTimeString([], { timeZone: tz, ...opts });
}


export function getBrowserTimeZone(): string {
return Intl.DateTimeFormat().resolvedOptions().timeZone;
}