import {
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

export function validateMinDate(rules: ValidationRules, value?: Date | null) {
  if (rules.min && rules.min?.value) {
    const minDate = parseOffsetAndGetDate(rules.min.value);
    if (minDate && value && value.getTime() < minDate.getTime()) {
      return getValidationFailure(rules.min, [minDate.toDateString()]);
    }
  }
}

export function validateMaxDate(rules: ValidationRules, value?: Date | null) {
  if (rules.max && rules.max?.value) {
    const maxDate = parseOffsetAndGetDate(rules.max.value);
    if (maxDate && value && value.getTime() > maxDate.getTime()) {
      return getValidationFailure(rules.max, [maxDate.toDateString()]);
    }
  }
}

export function isDateFieldValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  if (!rules) {
    return { valid: true };
  }

  const value = getDateValue(formValue);
  return validate(
    rules,
    value,
    validateRequired,
    validateMinDate,
    validateMaxDate
  );
}
