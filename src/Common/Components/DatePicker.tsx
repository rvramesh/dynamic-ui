import {
  DatePicker as KendoDatePicker,
  DatePickerProps as KendoDatePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import {
  FormFieldChildProps,
  FormFieldValue,
} from "../Types/FormFieldChildProps";

type DatePickerProps = FormFieldChildProps &
  Omit<KendoDatePickerProps, "value">;

function isDate(value: FormFieldValue): value is Date | string | number {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof (value as Date).toUTCString === "function"
  );
}

function DatePicker(props: DatePickerProps) {
  return (
    <KendoDatePicker
      {...props}
      onChange={(e) => props?.onValueChange?.(e.value)}
      value={
        props.value && isDate(props.value) ? new Date(props.value) : undefined
      }
    />
  );
}

export default DatePicker;
