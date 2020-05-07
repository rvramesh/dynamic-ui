import {
  FormFieldValue,
  KeyValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { getKeyValue } from "../Utils/KeyValueUtil";
import { getErrorMessage, validate } from "../Utils/ValidationUtil";

function validateRequired(rules: ValidationRules, value?: KeyValue) {
  if (rules.required && !value) {
    return { valid: false, message: getErrorMessage(rules.required.message) };
  }
}

export function isAutoCompleteValid(
  rules?: ValidationRules,
  formValue?: FormFieldValue
): ValidationResponse {
  if (!rules) {
    return { valid: true };
  }
  const value = getKeyValue(formValue);
  return validate(rules, value, validateRequired);
}
