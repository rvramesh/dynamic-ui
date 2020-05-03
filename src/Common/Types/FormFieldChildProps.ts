export type KeyValue =
  | { text: string; value: string | number }
  | { text: string }
  | KeyValue[];
export type FormFieldValue =
  | string
  | number
  | Date
  | null
  | {
      start: Date | null;
      end: Date | null;
    }
  | FormFieldValue[]
  | KeyValue;

export type FormFieldChildProps = {
  name: string;
  id: string;
  onBlur: () => void;
  onValueChange: (value: FormFieldValue) => void;
  value?: FormFieldValue;
};
