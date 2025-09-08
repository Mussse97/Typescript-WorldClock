
export function formatLocalTime(
  tz: string,
  opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  },
  now: Date = new Date() // default date if not provided
): string {
  return now.toLocaleTimeString([], { timeZone: tz, ...opts });
}

export function getBrowserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
