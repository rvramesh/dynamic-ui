import { get, set } from "lodash/fp";
import { FormChildProps } from "../Components/DynamicForm";
import { isFormFieldWithChildProps } from "../Components/FormFieldSet";
import { FormValues } from "../Context/DynamicFormContext";
import {
  FormFieldChildType,
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
  ValidationValueMessage,
} from "../Types/FormFieldChildProps";
import { FieldValidatorMapping } from "./FormUtil";
import { parseNumberFromString } from "./NumberUtil";

export function getErrorMessage(pattern: string, ...values: string[]) {
  if (!values) {
    return pattern;
  }
  for (let i = 0; i < values.length; i++) {
    pattern = pattern.replace("$[" + i + "]", values[i]);
  }
  return pattern;
}

export function getErrorMessageForRule(rule: ValidationValueMessage<string>) {
  return getErrorMessage(rule.message, rule.value);
}

export function getValidationFailure(
  rule: ValidationValueMessage<string | number>,
  values?: string[]
) {
  if (values) {
    return { valid: false, message: getErrorMessage(rule.message, ...values) };
  } else {
    return {
      valid: false,
      message: getErrorMessage(rule.message, rule.value.toString()),
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

type FieldChildRules = {
  type: FormFieldChildType;
  rules?: ValidationRules;
};

type FieldSetRules = {
  type: "FieldSet";
  rules?: ValidationRules;
  children: FieldSchemaRules;
};

export type FieldSchemaRules = {
  [key: string]: FieldChildRules | FieldSetRules | undefined;
};

export type FieldValidationErrors = {
  [key: string]: ValidationResponse | undefined;
} | null;

export function extractRulesFromFormFieldProps(
  fields: FormChildProps[]
): FieldSchemaRules {
  let result = {};
  for (const field of fields) {
    if (field.type === "FieldSet" && isFormFieldWithChildProps(field)) {
      result = {
        ...result,
        [field.name]: {
          type: field.type,
          rules: field.rules,
          children: { ...extractRulesFromFormFieldProps(field.childProps) },
        },
      };
    } else {
      result = {
        ...result,
        [field.name]: {
          type: field.type,
          rules: field.rules,
        },
      };
    }
  }
  return result;
}

export function buildPath(
  a: string | undefined,
  i: number | undefined,
  b: string
) {
  return a ? `${a}${i !== undefined ? `[${i}]` : ""}.${b}` : b;
}

export function validateFormState(values: FormValues, rules: FieldSchemaRules) {
  let errors = validateFormState2(values, rules);
  return {
    isValid: errors === null || Object.keys(errors).length === 0,
    errors: errors,
  };
}
export const DEFAULT_FEILDSET_MIN_VALUE = 1;
function validateFormState2(values: FormValues, rules: FieldSchemaRules) {
  let errors = {};
  for (const key in rules) {
    if (rules.hasOwnProperty(key)) {
      const element = rules[key];
      if (element === undefined) {
        continue;
      } else if (element.type === "FieldSet") {
        const { type, rules, ...others } = element;
        const arrayValue = get(key, values);
        if (arrayValue !== undefined && !Array.isArray(arrayValue)) {
          throw new Error("Invalid State");
        }
        for (
          let i = 0;
          i <
          Math.max(
            parseNumberFromString(rules?.min?.value) ??
              DEFAULT_FEILDSET_MIN_VALUE,
            arrayValue?.length ?? 0
          );
          i++
        ) {
          const val: any = arrayValue ? arrayValue[i] : undefined;
          const validationState = validateFormState2(val, others.children);
          if (validationState !== null) {
            errors = set(`${key}[${i}]`, validationState, errors);
          }
        }
      } else {
        const value = get(key, values);
        const validator = FieldValidatorMapping[element.type];
        const validationResponse = validator(element.rules, value);
        if (!validationResponse.valid) {
          errors = set(key, validationResponse, errors);
        }
      }
    }
  }

  return errors === null || Object.keys(errors).length === 0 ? null : errors;
}

function parseObjectProperties(
  objGraph: FormValues,
  validate: (
    obj: FormFieldValue,
    path: string,
    errors: FieldValidationErrors
  ) => FieldValidationErrors,
  parentKey?: string
): FieldValidationErrors {
  let errors = {};
  const isGraphAnArray = Array.isArray(objGraph);
  const objArray = Array.isArray(objGraph) ? objGraph : [objGraph];
  let index = 0;
  for (const obj of objArray) {
    for (var key in obj) {
      const currentPath = buildPath(
        parentKey,
        isGraphAnArray ? index : undefined,
        key
      );
      errors = {
        ...errors,
        ...validate(obj[key], currentPath, errors),
      };
      if (typeof obj[key] === "object") {
        errors = {
          ...errors,
          ...parseObjectProperties(obj[key], validate, currentPath),
        };
      }
    }
  }
  return errors;
}
