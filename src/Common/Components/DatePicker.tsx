import {
  DatePicker as KendoDatePicker,
  DatePickerProps as KendoDatePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FunctionComponent } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue, parseOffsetAndGetDate } from "../Utils/DateUtils";

type DatePickerProps = FormFieldChildProps &
  Omit<KendoDatePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

const DatePicker: FunctionComponent<DatePickerProps> = (props) => {
  const value = getDateValue(props.value);
  const minValue = props.min ? parseOffsetAndGetDate(props.min) : undefined;
  const maxValue = props.max ? parseOffsetAndGetDate(props.max) : undefined;
  return (
    <KendoDatePicker
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
      min={minValue}
      max={maxValue}
      width="100%"
    />
  );
};

export default DatePicker;
