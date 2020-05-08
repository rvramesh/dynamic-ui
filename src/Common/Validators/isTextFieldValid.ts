import {
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { parseNumberFromString } from "../Utils/NumberUtil";
import { getTextValue } from "../Utils/TextUtil";
import {
  getErrorMessage,
  getValidationFailure,
  validate,
} from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: string) {
  if (
    rules.required?.value &&
    (value === undefined || value.trim().length === 0)
  ) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}
function validateMinLength(rules: ValidationRules, value?: string) {
  if (rules.min && rules.min?.value) {
    const minLength = parseNumberFromString(rules.min.value);
    if (minLength && value?.length && value.length < minLength) {
      return getValidationFailure(rules.min);
    }
  }
}

function validateMaxLength(rules: ValidationRules, value?: string) {
  if (rules.max && rules.max?.value) {
    const maxLength = parseNumberFromString(rules.max.value);
    if (maxLength && value?.length && value.length > maxLength) {
      return getValidationFailure(rules.max);
    }
  }
}

function validateRegex(rules: ValidationRules, value?: string) {
  if (rules.regex) {
    for (const rule of rules.regex) {
      if (!new RegExp(rule.value).test(value ?? "")) {
        return {
          valid: false,
          message: getErrorMessage(rule.message, rule.value),
        };
      }
    }
  }
}

export function isTextFieldValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  const value = getTextValue(formValue);
  if (!rules) {
    return { valid: true };
  }

  return validate(
    rules,
    value,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validateRegex
  );
}
