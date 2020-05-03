import {
  TimePicker as KendoTimePicker,
  TimePickerProps as KendoTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue } from "../Utils/DateUtils";

type TimePickerProps = FormFieldChildProps &
  Omit<KendoTimePickerProps, "value">;

function TimePicker(props: TimePickerProps) {
  const value = getDateValue(props.value);

  return (
    <KendoTimePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
    />
  );
}

export default TimePicker;
