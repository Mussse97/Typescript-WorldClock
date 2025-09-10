
export function formatLocalTime(
  tz: string, // tz for timezone (dont want multiple timezones in opts)
  opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  },
  currentTime: Date = new Date() // default date if not provided
): string {
  return currentTime.toLocaleTimeString([], { timeZone: tz, ...opts });
}

export function getBrowserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
