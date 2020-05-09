import {
  TimePicker as KendoTimePicker,
  TimePickerProps as KendoTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FunctionComponent } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateValue, parseDateFromString } from "../Utils/DateUtils";
import WrappedDateInput from "./DateInput";

type TimePickerProps = FormFieldChildProps &
  Omit<KendoTimePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

const TimePicker: FunctionComponent<TimePickerProps> = (props) => {
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
      width="100%"
      dateInput={WrappedDateInput}
    />
  );
};

export default TimePicker;
