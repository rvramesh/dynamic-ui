import {
  TimePicker as KendoTimePicker,
  TimePickerProps as KendoTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue, parseDateFromString } from "../Utils/DateUtils";

type TimePickerProps = FormFieldChildProps &
  Omit<KendoTimePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

function TimePicker(props: TimePickerProps) {
  const value = getDateValue(props.value);
  const minValue = props.min ? parseDateFromString(props.min) : undefined;
  const maxValue = props.max ? parseDateFromString(props.max) : undefined;

  return (
    <KendoTimePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
      min={minValue}
      max={maxValue}
    />
  );
}

export default TimePicker;
