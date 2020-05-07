import {
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getBooleanValue } from "../Utils/BooleanUtil";
import { getErrorMessage, validate } from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: boolean) {
  if (rules.required && value !== true) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}

export function isCheckBoxValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  if (!rules) {
    return { valid: true };
  }
  const value = getBooleanValue(formValue);
  return validate(rules, value, validateRequired);
}
