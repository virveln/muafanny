
import {
  format,
  parseISO,
  isSameMonth,
  isSameYear,
  differenceInCalendarDays,
} from "date-fns";

import { sv } from "date-fns/locale";

export function formatSelectedDates(dates: string[]) {
  if (!dates.length) return "";

  const sortedDates = [...dates]
    .sort()
    .map((date) => parseISO(date));

  const ranges: Date[][] = [];
  let currentRange = [sortedDates[0]];

  for (let i = 1; i < sortedDates.length; i++) {
    const previous = currentRange[currentRange.length - 1];
    const current = sortedDates[i];

    if (differenceInCalendarDays(current, previous) === 1) {
      currentRange.push(current);
    } else {
      ranges.push(currentRange);
      currentRange = [current];
    }
  }

  ranges.push(currentRange);

  return ranges
    .map((range) => {
      const first = range[0];
      const last = range[range.length - 1];

      if (range.length === 1) {
        return format(first, "d MMMM yyyy", { locale: sv });
      }

      if (isSameMonth(first, last) && isSameYear(first, last)) {
        return `${format(first, "d", { locale: sv })}–${format(
          last,
          "d MMMM yyyy",
          { locale: sv }
        )}`;
      }

      if (isSameYear(first, last)) {
        return `${format(first, "d MMMM", { locale: sv })}–${format(
          last,
          "d MMMM yyyy",
          { locale: sv }
        )}`;
      }

      return `${format(first, "d MMMM yyyy", {
        locale: sv,
      })}–${format(last, "d MMMM yyyy", {
        locale: sv,
      })}`;
    })
    .join(", ");
}
