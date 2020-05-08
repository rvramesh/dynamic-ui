import {
  ValidationResponse,
  ValidationRules,
  ValidationValueMessage,
} from "../Types/FormFieldChildProps";

export function getErrorMessage(pattern: string, ...values: string[]) {
  if (!values) {
    return pattern;
  }
  for (let i = 0; i < values.length; i++) {
    pattern = pattern.replace("${" + i + "}", values[i]);
  }
  return pattern;
}

export function getErrorMessageForRule(rule: ValidationValueMessage<string>) {
  return getErrorMessage(rule.message, rule.value);
}

export function getValidationFailure(
  rule: ValidationValueMessage<string>,
  values?: string[]
) {
  if (values) {
    return { valid: false, message: getErrorMessage(rule.message, ...values) };
  } else {
    return {
      valid: false,
      message: getErrorMessage(rule.message, rule.value),
    };
  }
}

export function validate<T>(
  rules: ValidationRules,
  value?: T,
  ...validators: Array<
    (rules: ValidationRules, value?: T) => ValidationResponse | undefined
  >
): ValidationResponse {
  for (const validator of validators) {
    const result = validator(rules, value);
    if (result?.valid === false) {
      return result;
    }
  }
  return { valid: true };
}
