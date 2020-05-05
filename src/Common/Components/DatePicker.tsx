import {
  DatePicker as KendoDatePicker,
  DatePickerProps as KendoDatePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue } from "../Utils/DateUtils";

type DatePickerProps = FormFieldChildProps &
  Omit<KendoDatePickerProps, "value">;

function DatePicker(props: DatePickerProps) {
  debugger;
  const value = getDateValue(props.value);

  return (
    <KendoDatePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
    />
  );
}

export default DatePicker;
