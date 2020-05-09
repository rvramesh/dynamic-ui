import {
  DatePicker as KendoDatePicker,
  DatePickerProps as KendoDatePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FunctionComponent } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue, parseOffsetAndGetDate } from "../Utils/DateUtils";
import WrappedDateInput from "./DateInput";

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
      onChange={(e) => {
        debugger;
        props.onValueChange(e.value);
      }}
      dateInput={WrappedDateInput}
      value={value}
      min={minValue}
      max={maxValue}
      width="100%"
    />
  );
};

export default DatePicker;
