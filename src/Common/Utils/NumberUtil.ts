import { FormFieldValue } from "../Types/FormFieldChildProps";

export function isNumber(value: FormFieldValue): value is number {
  return typeof value === "number";
}

export const getNumberValue = (value: FormFieldValue): number | undefined =>
  value && isNumber(value) ? value : undefined;

export const parseNumberFromString = (
  value: string | undefined | number
): number | undefined => {
  if (value) {
    const result = parseFloat(value.toString());
    return isNaN(result) ? undefined : result;
  } else {
    return undefined;
  }
};
