import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isBoolean(value: FormFieldValue): value is boolean | undefined {
  return typeof value === "boolean";
}

export const getBooleanValue = (value: FormFieldValue) =>
  value && isBoolean(value) ? value : false;
