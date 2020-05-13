import {
  DateRange,
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getDateRangeValue, parseOffsetAndGetDate } from "../Utils/DateUtils";
import {
  getErrorMessage,
  getErrorMessageForRule,
  validate,
} from "../Utils/ValidationUtil";
import { validateMaxDate, validateMinDate } from "./isDateFieldValid";

function validateRequired(rules: ValidationRules, value?: DateRange) {
  if (rules.required && (!value || !value.start || !value.end)) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}

function validateCompleteInput(value?: DateRange) {
  if (
    value &&
    ((value.start === null && value.end !== null) ||
      (value.start !== null && value.end === null))
  ) {
    return {
      valid: false,
      message: "Both Start and End date needs to be specified",
    };
  }
}

function validateStartDateIsBeforeEndDate(value?: DateRange) {
  if (
    value &&
    value.start &&
    value.end &&
    value.end.getTime() < value.start.getTime()
  ) {
    return {
      valid: false,
      message: "End date should be more than start date",
    };
  }
}

function validateMinDateRange(rules: ValidationRules, value?: DateRange) {
  return validateMinDate(rules, value?.start);
}

function validateMaxDateRange(rules: ValidationRules, value?: DateRange) {
  return validateMaxDate(rules, value?.end);
}

function validateMinDateRangeDuration(
  rules: ValidationRules,
  value?: DateRange
) {
  if (
    rules.minRange &&
    value &&
    value.start !== null &&
    value.start !== undefined &&
    value.end !== null &&
    value.end !== undefined
  ) {
    const startWithMinValue = parseOffsetAndGetDate(
      rules.minRange.value,
      () => value.start ?? new Date()
    );

    if (startWithMinValue) {
      if (startWithMinValue.getTime() > value.end.getTime()) {
        return {
          valid: false,
          message: getErrorMessageForRule(rules.minRange),
        };
      }
    }
  }
}

function validateMaxDateRangeDuration(
  rules: ValidationRules,
  value?: DateRange
) {
  if (
    rules.maxRange &&
    value &&
    value.start !== null &&
    value.start !== undefined &&
    value.end !== null &&
    value.end !== undefined
  ) {
    const startWithMaxValue = parseOffsetAndGetDate(
      rules.maxRange.value,
      () => value.start ?? new Date()
    );

    if (startWithMaxValue) {
      if (startWithMaxValue.getTime() > value.end.getTime()) {
        return {
          valid: false,
          message: getErrorMessageForRule(rules.maxRange),
        };
      }
    }
  }
}

export function isDateRangeFieldValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  const value = getDateRangeValue(formValue);
  const completeInputResult = validateCompleteInput(value);
  if (completeInputResult) {
    return completeInputResult;
  }
  const startDateBeforeEndDateResult = validateStartDateIsBeforeEndDate(value);
  if (startDateBeforeEndDateResult) {
    return startDateBeforeEndDateResult;
  }

  if (!rules) {
    return { valid: true };
  }

  return validate(
    rules,
    value,
    validateRequired,
    validateMinDateRange,
    validateMaxDateRange,
    validateMinDateRangeDuration,
    validateMaxDateRangeDuration
  );
}
