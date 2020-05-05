export type KeyValue =
  | { text: string; value: string | number }
  | { text: string }
  | KeyValue[];
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
  | FormFieldValue[]
  | KeyValue
  | undefined;

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
};
