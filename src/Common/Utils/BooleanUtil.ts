import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isBoolean(value: FormFieldValue): value is boolean | undefined {
  return typeof value === "boolean";
}

export const getBooleanValue = (value: FormFieldValue) =>
  value && isBoolean(value) ? value : false;

export const parseBooleanFromString = (value: string | undefined) =>
  value
    ? value.toLowerCase() === "true"
      ? true
      : value.toLowerCase() === "false"
      ? false
      : undefined
    : undefined;
