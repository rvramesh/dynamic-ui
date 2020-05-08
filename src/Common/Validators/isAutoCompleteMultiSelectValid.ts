import {
  FormFieldValue,
  KeyValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getKeyValueArray } from "../Utils/KeyValueUtil";
import { parseNumberFromString } from "../Utils/NumberUtil";
import {
  getErrorMessage,
  getValidationFailure,
  validate,
} from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: KeyValue[]) {
  if (rules.required && !value) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}

function validateMinLength(rules: ValidationRules, value?: KeyValue[]) {
  if (rules.min && rules.min?.value) {
    const minLength = parseNumberFromString(rules.min.value);
    if (minLength && (value?.length ?? 0) < minLength) {
      return getValidationFailure(rules.min);
    }
  }
}

function validateMaxLength(rules: ValidationRules, value?: KeyValue[]) {
  if (rules.max && rules.max?.value) {
    const maxLength = parseNumberFromString(rules.max.value);
    if (maxLength && (value?.length ?? 0) > maxLength) {
      return getValidationFailure(rules.max);
    }
  }
}

export function isAutoCompleteMultiSelectValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  if (!rules) {
    return { valid: true };
  }

  const value = getKeyValueArray(formValue);
  return validate(
    rules,
    value,
    validateRequired,
    validateMinLength,
    validateMaxLength
  );
}
