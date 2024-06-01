import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

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
