import {
  DateTimePicker as KendoDateTimePicker,
  DateTimePickerProps as KendoDateTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue, parseOffsetAndGetDate } from "../Utils/DateUtils";

type DateTimePickerProps = FormFieldChildProps &
  Omit<KendoDateTimePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

function DateTimePicker(props: DateTimePickerProps) {
  const value = getDateValue(props.value);
  const minValue = props.min ? parseOffsetAndGetDate(props.min) : undefined;
  const maxValue = props.max ? parseOffsetAndGetDate(props.max) : undefined;

  return (
    <KendoDateTimePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
      min={minValue}
      max={maxValue}
    />
  );
}

export default DateTimePicker;
