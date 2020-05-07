import {
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getNumberValue, parseNumberFromString } from "../Utils/NumberUtil";
import {
  getErrorMessage,
  getValidationFailure,
  validate,
} from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: number) {
  if (rules.required?.value && value === undefined) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}
function validateMin(rules: ValidationRules, value?: number) {
  if (rules.min && rules.min?.value) {
    const min = parseNumberFromString(rules.min.value);
    if (min !== undefined && (value ?? 0) < min) {
      return getValidationFailure(rules.min);
    }
  }
}

function validateMax(rules: ValidationRules, value?: number) {
  if (rules.max && rules.max?.value) {
    const max = parseNumberFromString(rules.max.value);
    if (max !== undefined && (value ?? 0) > max) {
      return getValidationFailure(rules.max);
    }
  }
}

export function isNumericTextBoxValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  debugger;
  const value = getNumberValue(formValue);
  if (!rules) {
    return { valid: true };
  }

  return validate(rules, value, validateRequired, validateMin, validateMax);
}
