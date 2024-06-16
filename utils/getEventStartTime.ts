/**
 * Takes a `dateString` string and formats it
 *
 * @param dateString date in format `2024-06-12T18:38:21.099Z`
 * @returns Formatted date `April 4, 2017 – 2:17 PM`
 */
const getEventStartTime = (dateString: string) => {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} – ${formattedTime}`;
};

export default getEventStartTime;
