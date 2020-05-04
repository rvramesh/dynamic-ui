import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isNumber(value: FormFieldValue): value is number {
  return typeof value === "number";
}

export const getNumberValue = (value: FormFieldValue): number | undefined =>
  value && isNumber(value) ? value : undefined;
