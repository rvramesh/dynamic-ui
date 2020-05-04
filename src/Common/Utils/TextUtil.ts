import { FormFieldValue } from "../Types/FormFieldChildProps";
import { isNumber } from "./NumberUtil";

export function isText(value: FormFieldValue): value is string[] | string {
  return (
    typeof value === "string" ||
    (Array.isArray(value) && typeof value[0] === "string")
  );
}

export const getTextValue = (value: FormFieldValue) =>
  value && isText(value)
    ? value
    : isNumber(value)
    ? value.toString()
    : undefined;
