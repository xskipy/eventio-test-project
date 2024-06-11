type LogType = "info" | "warn" | "error" | "debug";

const COLORS: Record<LogType, string> = {
  info: "\u001b[1;34m", // Blue
  warn: "\u001b[1;33m", // Yellow
  error: "\u001b[1;31m", // Red
  debug: "\u001b[1;32m", // Green
};

const RESET = "\u001b[0m";

function devLog(message: any): void;
function devLog(type: LogType, ...messages: any[]): void;
function devLog(typeOrMessage: LogType | any, ...messages: any[]): void {
  if (process.env.NODE_ENV !== "development") return;

  let type: LogType;
  let color: string;
  let outputMessages: any[];

  if (messages.length === 0) {
    // Only one parameter provided, default to 'info' type
    type = "info";
    color = COLORS[type];
    outputMessages = [typeOrMessage];
  } else {
    type = typeOrMessage;
    color = COLORS[type] || "\u001b[1;30m"; // Default to black if type is not found
    outputMessages = messages;
  }

  const typeLabel = `[--${type.toUpperCase()}--]`;

  console.log(`${color}${typeLabel}${RESET}`, ...outputMessages);
}

export default devLog;
