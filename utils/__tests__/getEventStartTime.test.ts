import getEventStartTime from "../getEventStartTime";

describe("getEventStartTime", () => {
  it("should format a date string to the correct format", () => {
    const dateString = "2024-06-12T18:38:21.099Z";
    const expected = "June 12, 2024 – 6:38 PM";
    expect(getEventStartTime(dateString)).toBe(expected);
  });

  it("should handle dates with single-digit days correctly", () => {
    const dateString = "2024-04-04T14:17:00.000Z";
    const expected = "April 4, 2024 – 2:17 PM";
    expect(getEventStartTime(dateString)).toBe(expected);
  });

  it("should format dates in the morning correctly", () => {
    const dateString = "2024-06-12T08:30:00.000Z";
    const expected = "June 12, 2024 – 8:30 AM";
    expect(getEventStartTime(dateString)).toBe(expected);
  });

  it("should format dates at noon correctly", () => {
    const dateString = "2024-06-12T12:00:00.000Z";
    const expected = "June 12, 2024 – 12:00 PM";
    expect(getEventStartTime(dateString)).toBe(expected);
  });

  it("should format dates at midnight correctly", () => {
    const dateString = "2024-06-12T00:00:00.000Z";
    const expected = "June 12, 2024 – 12:00 AM";
    expect(getEventStartTime(dateString)).toBe(expected);
  });
});
