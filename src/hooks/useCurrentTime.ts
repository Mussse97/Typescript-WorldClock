
import { useEffect, useState } from "react";


export function usecurrentTime(tickMs: number = 1000): Date {
const [currentTime, setcurrentTime] = useState<Date>(() => new Date());

useEffect(() => {
const id = setInterval(() => setcurrentTime(new Date()), tickMs);
return () => clearInterval(id);
}, [tickMs]);

return currentTime;
}