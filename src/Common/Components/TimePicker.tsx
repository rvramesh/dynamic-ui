import {
  TimePicker as KendoTimePicker,
  TimePickerProps as KendoTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type TimePickerProps = KendoTimePickerProps & FormFieldProps;

function TimePicker(props: TimePickerProps) {
  return <KendoTimePicker {...props} />;
}

export default TimePicker;
