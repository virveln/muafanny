
import { DayPicker } from "react-day-picker";
import { unavailableDateObjects } from "../../data/availability";
import { sv } from "date-fns/locale";
import "./AvailabilityCalendar.css";

export default function AvailabilityCalendar() {
  return (
    <div className="availability-calendar">   
      <DayPicker
        mode="single"
        showOutsideDays
        locale={sv}
        disabled={[
          ...unavailableDateObjects,
          { before: new Date() },
        ]}
        modifiers={{
          unavailable: unavailableDateObjects,
        }}
        modifiersClassNames={{
          unavailable: "availability-unavailable",
        }}
      />

      <div className="availability-calendar-legend">
        <span className="availability-calendar-legend-dot" />
        <span>Ej tillgänglig</span>
      </div>
    </div>
  );
}
