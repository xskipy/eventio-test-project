import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

/**
 * Utility function to extract error message from react hook form field
 * @param fieldError useForm error field
 * @returns Error field message
 */
const getErrorMessage = (
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
): string => {
  if (!fieldError) {
    return "";
  }
  if ("message" in fieldError) {
    return fieldError.message as string;
  }
  return "";
};

export default getErrorMessage;
