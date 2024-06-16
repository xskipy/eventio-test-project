import convertToISO from "../convertToISO";

describe("convertToISO", () => {
  it("should convert AM time correctly", () => {
    const timeStr = "2:20 AM";
    const dateStr = "01.01.2001";
    const expected = "2001-01-01T02:20:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });

  it("should convert PM time correctly", () => {
    const timeStr = "2:20 PM";
    const dateStr = "01.01.2001";
    const expected = "2001-01-01T14:20:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });

  it("should handle midnight correctly", () => {
    const timeStr = "12:00 AM";
    const dateStr = "01.01.2001";
    const expected = "2001-01-01T00:00:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });

  it("should handle noon correctly", () => {
    const timeStr = "12:00 PM";
    const dateStr = "01.01.2001";
    const expected = "2001-01-01T12:00:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });

  it("should convert single-digit day and month correctly", () => {
    const timeStr = "9:05 AM";
    const dateStr = "7.4.2024";
    const expected = "2024-04-07T09:05:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });

  it("should convert different years correctly", () => {
    const timeStr = "11:59 PM";
    const dateStr = "31.12.1999";
    const expected = "1999-12-31T23:59:00.000Z";
    expect(convertToISO(timeStr, dateStr)).toBe(expected);
  });
});
