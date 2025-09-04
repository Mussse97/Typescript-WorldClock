
import { useEffect, useState } from "react";


export function useNow(tickMs: number = 1000): Date {
const [now, setNow] = useState<Date>(() => new Date());

useEffect(() => {
const id = setInterval(() => setNow(new Date()), tickMs);
return () => clearInterval(id);
}, [tickMs]);

return now;
}