/**
 * Accepts `timeStr and dateStr params and returns ISO formatted date string
 * @param timeStr Time string in format `2:20 AM` / `2:20 PM`
 * @param dateStr Date string in format `01.01.2001`
 * @returns ISO formatted date string `2001-01-01T02:20:00.000Z`
 */
const convertToISO = (timeStr: string, dateStr: string): string => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const [day, month, year] = dateStr.split(".").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));

  return date.toISOString();
};

export default convertToISO;
