
import { useEffect, useState } from "react";

// Hook to get the current time, updating every tickMs milliseconds (default 1000ms)
export function usecurrentTime(tickMs: number = 1000): Date {
const [currentTime, setcurrentTime] = useState<Date>(() => new Date());

useEffect(() => {
const id = setInterval(() => setcurrentTime(new Date()), tickMs);
return () => clearInterval(id);
}, [tickMs]);

return currentTime;
}