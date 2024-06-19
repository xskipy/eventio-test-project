import ValidationType from "@/types/ValidationType";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] [AP]M$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PASSWORD:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  DATE: "Incorrect date format. Please use `01.01.2001` format.",
  TIME: "Incorrect time format. Please use `2:50 PM` / `2:50 AM` format.",
};

const getInputRules = (validation?: ValidationType, isRequired: boolean = false) => {
  const rules = {
    required: { value: isRequired, message: MESSAGES.REQUIRED },
    pattern: { value: /./g, message: "" },
  };

  switch (validation) {
    case "email":
      rules.pattern = { value: emailRegex, message: MESSAGES.EMAIL };
      break;

    case "password":
      rules.pattern = { value: passwordRegex, message: MESSAGES.PASSWORD };
      break;

    case "date":
      rules.pattern = { value: dateRegex, message: MESSAGES.DATE };
      break;

    case "time":
      rules.pattern = { value: timeRegex, message: MESSAGES.TIME };
      break;

    default:
      break;
  }

  return rules;
};

export default getInputRules;
