
import { Link } from "react-router";
import { formatLocalTime } from "../utils/time";

// defining props for TimeBadge component
interface TimeBadgeProps {
  id: string;
  cityName: string;
  country: string;
  timezone: string;
  currentTime: Date;
  removable?: boolean;
  onRemove?: () => void;
}
// TimeBadge component to display city time and info
export default function TimeBadge({
  id,
  cityName,
  country,
  timezone,
  currentTime,
  removable,
  onRemove,
}: TimeBadgeProps) {
  
  return (
    <div className="card" aria-live="polite">
      <Link to={`/city/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={{ margin: "0 0 4px" }}>
          {cityName}, {country}
        </h2>
        <div style={{ fontSize: 28, fontVariantNumeric: "tabular-nums" }}>
          {formatLocalTime(
            timezone,
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            },
            currentTime
          )}
        </div>
        <div style={{ opacity: 0.7, marginTop: 4 }}>{timezone}</div>
      </Link>

      {removable && onRemove && (
        <button
          className="remove-btn"
          onClick={onRemove}
          aria-label={`Remove ${cityName}`}
        >
          ×
        </button>
      )}
    </div>
  );
}

