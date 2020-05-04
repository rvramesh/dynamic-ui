import { DateRange, FormFieldValue } from "../Types/FormFieldChildProps";

export function isDate(value: FormFieldValue): value is Date | string | number {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof (value as Date).toUTCString === "function"
  );
}

export const getDateValue = (value: FormFieldValue): Date | null =>
  value && isDate(value) ? new Date(value) : null;

export function isDateRange(value: FormFieldValue): value is DateRange {
  return (
    typeof value === "object" &&
    (isDate((value as DateRange).start) || isDate((value as DateRange).end))
  );
}

export const getDateRangeValue = (
  value: FormFieldValue
): DateRange | undefined =>
  value && isDateRange(value)
    ? { start: getDateValue(value.start), end: getDateValue(value.end) }
    : undefined;
