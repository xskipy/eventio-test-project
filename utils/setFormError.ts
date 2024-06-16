import { UseFormReturn } from "react-hook-form";

/**
 * Sets react hook form error for specific field
 * @param formMethods react hook form methods
 * @param field The input field name
 * @param message Message to set as error
 */
const setFormError = (
  formMethods: UseFormReturn<any, any, any>,
  field: string,
  message?: string
) => {
  formMethods.setError(field, { message });
};

export default setFormError;
