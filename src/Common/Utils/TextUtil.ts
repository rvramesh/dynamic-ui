import { FormFieldValue } from "../Types/FormFieldChildProps";
import { isNumber } from "./NumberUtil";

export function isText(value: FormFieldValue): value is string {
  return typeof value === "string";
}

export const getTextValue = (value: FormFieldValue) =>
  value && isText(value) ? value : isNumber(value) ? value.toString() : null;
