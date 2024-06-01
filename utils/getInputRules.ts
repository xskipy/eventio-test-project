import ValidationType from "@/types/ValidationType";
import { ValidationRule } from "react-hook-form";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PASSWORD:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
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

    default:
      break;
  }

  return rules;
};

export default getInputRules;
