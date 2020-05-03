import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isText(
  value: FormFieldValue
): value is string[] | string | number | undefined {
  return (
    typeof value === "undefined" ||
    typeof value === "number" ||
    typeof value === "string" ||
    (Array.isArray(value) && typeof value[0] === "string")
  );
}

export const getTextValue = (value: FormFieldValue) =>
  value && isText(value) ? value : undefined;
