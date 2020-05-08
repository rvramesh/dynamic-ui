export type KeyValue =
  | { text: string; value: string | number }
  | { text: string };
export type DateRange = {
  start: Date | null;
  end: Date | null;
};
export type FormFieldValue =
  | string
  | number
  | Date
  | boolean
  | null
  | DateRange
  | KeyValue
  | KeyValue[]
  | undefined;

export type ValidationValueMessage<T extends string | boolean | number> = {
  value: T;
  message: string;
};

export type ValidationRules = {
  min?: ValidationValueMessage<string | number>;
  max?: ValidationValueMessage<string | number>;
  regex?: ValidationValueMessage<string>[];
  required?: ValidationValueMessage<boolean>;
  minRange?: ValidationValueMessage<string>;
  maxRange?: ValidationValueMessage<string>;
};

export type ValidationResponse =
  | {
      valid: true;
    }
  | {
      valid: false;
      message: string;
    };
export type FieldValidator = (
  rules?: ValidationRules | undefined,
  formValue?: FormFieldValue
) => ValidationResponse;

export type FormFieldChildType =
  | "Select"
  | "MultiSelect"
  | "Date"
  | "DateTime"
  | "Time"
  | "DateRange"
  | "MaskedTextBox"
  | "TextBox"
  | "NumericTextBox"
  | "CheckBox";

export type FormFieldType = FormFieldChildType | "FieldSet";

export type FormFieldChildProps = {
  id: string;
  onBlur: () => void;
  onValueChange: (value: FormFieldValue) => void;
  value?: FormFieldValue;
  valid: boolean;
  validationMessage?: string;
};
