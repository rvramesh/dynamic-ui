import { DateRange, FormFieldValue } from "../Types/FormFieldChildProps";
import { isNumber } from "./NumberUtil";

//We are using /g switch which will make .test and .exec stateful
//so, we are creating a factory method to return new object
const _dateOffsetPatternFactory = () =>
  new RegExp(/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g);

/* Handle switch to/from daylight saving.
 * Hours may be non-zero on daylight saving cut-over:
 * > 12 when midnight changeover, but then cannot generate
 * midnight datetime, so jump to 1AM, otherwise reset.
 * @param  date  (Date) the date to check
 * @return  (Date) the corrected date
 */
const _daylightSavingAdjust = (date: Date) => {
  date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
  return date;
};

/* Find the number of days in a given month. */
const _getDaysInMonth = (year: number, month: number) =>
  32 - _daylightSavingAdjust(new Date(year, month, 32)).getDate();

function _dateArithmeticFromPattern(offset: string, date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  //matches +9d-1m10y-2w
  const dateOffsetPattern = _dateOffsetPatternFactory();

  let matches = dateOffsetPattern.exec(offset);
  while (matches) {
    //if only numbers is present treat them as dates
    switch (matches[2] || "d") {
      case "d":
      case "D":
        day += parseInt(matches[1], 10);
        break;
      case "w":
      case "W":
        day += parseInt(matches[1], 10) * 7;
        break;
      case "m":
      case "M":
        month += parseInt(matches[1], 10);
        day = Math.min(day, _getDaysInMonth(year, month));
        break;
      case "y":
      case "Y":
        year += parseInt(matches[1], 10);
        day = Math.min(day, _getDaysInMonth(year, month));
        break;
    }
    matches = dateOffsetPattern.exec(offset);
  }
  return new Date(year, month, day);
}

const _isDateOffsetPattern = (offset: string) =>
  _dateOffsetPatternFactory().test(offset);

const _isDateRange = (value: FormFieldValue): value is DateRange =>
  typeof value === "object" &&
  (_isDate((value as DateRange).start) || _isDate((value as DateRange).end));

const _isDate = (value: FormFieldValue): value is Date | string | number =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof (value as Date).toUTCString === "function";

const getDateValue = (value: FormFieldValue): Date | null =>
  value && _isDate(value) ? new Date(value) : null;

const getDateRangeValue = (value: FormFieldValue): DateRange | undefined =>
  value && _isDateRange(value)
    ? { start: getDateValue(value.start), end: getDateValue(value.end) }
    : undefined;

const parseOffsetAndGetDate = (
  offset: string | number,
  dateProvider: () => Date = () => new Date()
) => {
  if (isNumber(offset)) {
    return undefined;
  }
  if (!isNaN(Date.parse(offset))) {
    //if Offset is of valid date format, return the same
    return new Date(offset);
  } else if (_isDateOffsetPattern(offset)) {
    return _dateArithmeticFromPattern(offset, dateProvider());
  } else {
    //if offset is not valid, return undefined
    return undefined;
  }
};

const parseDateFromString = (date: string) => {
  if (!isNaN(Date.parse(date))) {
    //if Offset is of valid date format, return the same
    return new Date(date);
  } else {
    //if offset is not valid, return undefined
    return undefined;
  }
};

export {
  getDateValue,
  parseOffsetAndGetDate,
  getDateRangeValue,
  parseDateFromString,
};
