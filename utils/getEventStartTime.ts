/**
 * Takes a `dateString` string and formats it
 *
 * @param dateString date in format `2024-06-12T18:38:21.099Z`
 * @returns Formatted date `April 4, 2017 – 2:17 PM`
 */
const getEventStartTime = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: undefined,
    minute: undefined,
    hour12: true,
  };

  // Format the date and time in a single step
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate} – ${formattedTime}`;
};

export default getEventStartTime;
