export type KeyValue =
  | { text: string; value: string | number }
  | { text: string }
  | KeyValue[];
export type FormFieldValue =
  | string
  | number
  | Date
  | boolean
  | null
  | {
      start: Date | null;
      end: Date | null;
    }
  | FormFieldValue[]
  | KeyValue
  | undefined;

export type FormFieldType =
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
export type FormFieldChildProps = {
  name: string;
  id: string;
  onBlur: () => void;
  onValueChange: (value: FormFieldValue) => void;
  value?: FormFieldValue;
  type: FormFieldType;
};
