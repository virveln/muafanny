
import { format } from "date-fns";
import { Calendar } from "@mantine/dates";
import { unavailableDates } from "../../data/availability";
import "./AvailabilityCalendar.css";

const unavailableDateSet = new Set(unavailableDates);

const calendarClassNames = {
  calendarHeader: "mantine-calendar__header",
  calendarHeaderControl: "mantine-calendar__header-control",
  calendarHeaderLevel: "mantine-calendar__header-level",
  day: "mantine-calendar__day",
  month: "mantine-calendar__month",
  weekday: "mantine-calendar__weekday",
};

export default function AvailabilityCalendar() {
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="availability-calendar">
      <Calendar
        className="mantine-calendar availability-calendar__calendar"
        classNames={calendarClassNames}
        defaultDate={today}
        maxLevel="month"
        headerControlsOrder={["level", "previous", "next"]}
        locale="sv"
        static
        excludeDate={(date) => date < today || unavailableDateSet.has(date)}
        getDayProps={(date) =>
          unavailableDateSet.has(date)
            ? { className: "availability-unavailable" }
            : {}
        }
      />

      <div className="availability-calendar-legend">
        <span className="availability-calendar-legend-dot" />
        <span>Ej tillgänglig</span>
      </div>
    </div>
  );
}
