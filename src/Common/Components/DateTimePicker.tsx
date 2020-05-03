import {
  DateTimePicker as KendoDateTimePicker,
  DateTimePickerProps as KendoDateTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue } from "../Utils/DateUtils";

type DateTimePickerProps = FormFieldChildProps &
  Omit<KendoDateTimePickerProps, "value">;

function DateTimePicker(props: DateTimePickerProps) {
  const value = getDateValue(props.value);

  return (
    <KendoDateTimePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
    />
  );
}

export default DateTimePicker;
