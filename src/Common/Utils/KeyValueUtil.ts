import { FormFieldValue, KeyValue } from "../Types/FormFieldChildProps";

export function isKeyValue(value: FormFieldValue): value is KeyValue {
  return (
    typeof value === "object" && typeof (value as KeyValue).text === "string"
  );
}

export function isKeyValueArray(value: FormFieldValue): value is KeyValue[] {
  return (
    typeof value === "object" &&
    Array.isArray(value) &&
    (value.length === 0 || isKeyValue(value[0]))
  );
}

export function getKeyValue(value: FormFieldValue) {
  if (isKeyValue(value)) {
    return value;
  } else if (isKeyValueArray(value)) {
    return value[0];
  } else {
    return undefined;
  }
}

export function getKeyValueArray(value: FormFieldValue) {
  if (isKeyValueArray(value)) {
    return value;
  } else {
    return undefined;
  }
}
