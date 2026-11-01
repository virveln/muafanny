export const unavailableDates = [
  "2026-11-03",
  "2026-11-04",
  "2026-11-05",
  "2026-11-12",
  "2026-11-13",
];

// Convert ISO date strings to local Date objects
export const unavailableDateObjects = unavailableDates.map((date) => {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
});