import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isDate(value: FormFieldValue): value is Date | string | number {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof (value as Date).toUTCString === "function"
  );
}

export const getDateValue = (value: FormFieldValue): Date | undefined =>
  value && isDate(value) ? new Date(value) : undefined;
