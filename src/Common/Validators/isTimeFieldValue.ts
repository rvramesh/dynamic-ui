import {
  FieldValidator,
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getDateValue, parseOffsetAndGetDate } from "../Utils/DateUtils";
import {
  getErrorMessage,
  getValidationFailure,
  validate,
} from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: Date | null) {
  if (rules.required && !value) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}

function getTimeWithStandardDate(date: Date) {
  const minTimeWithStandardDate = new Date(date);
  minTimeWithStandardDate.setDate(1);
  minTimeWithStandardDate.setMonth(1);
  minTimeWithStandardDate.setFullYear(2020);
  return minTimeWithStandardDate;
}

function validateMinTime(rules: ValidationRules, value?: Date | null) {
  if (rules.min && rules.min?.value) {
    const minDate = parseOffsetAndGetDate(rules.min.value);
    if (minDate && value) {
      const valueWithStandardDate = getTimeWithStandardDate(value);
      const minValueWithStandardDate = getTimeWithStandardDate(minDate);
      if (
        valueWithStandardDate.getTime() < minValueWithStandardDate.getTime()
      ) {
        return getValidationFailure(rules.min);
      }
    }
  }
}

function validateMaxTime(rules: ValidationRules, value?: Date | null) {
  if (rules.max && rules.max?.value) {
    const maxDate = parseOffsetAndGetDate(rules.max.value);
    if (maxDate && value) {
      const valueWithStandardDate = getTimeWithStandardDate(value);
      const maxValueWithStandardDate = getTimeWithStandardDate(maxDate);
      if (
        valueWithStandardDate.getTime() > maxValueWithStandardDate.getTime()
      ) {
        return getValidationFailure(rules.max);
      }
    }
  }
}

export const isTimeFieldValid: FieldValidator = (
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse => {
  if (!rules) {
    return { valid: true };
  }

  const value = getDateValue(formValue);
  return validate(
    rules,
    value,
    validateRequired,
    validateMinTime,
    validateMaxTime
  );
};
