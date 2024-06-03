import { UseFormReturn } from "react-hook-form";

const setFormError = (
  formMethods: UseFormReturn<any, any, any>,
  field: string,
  message?: string
) => {
  formMethods.setError(field, { message });
};

export default setFormError;
