import {
  TimePicker as KendoTimePicker,
  TimePickerProps as KendoTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type TimePickerProps = KendoTimePickerProps & FormFieldChildProps;

function TimePicker(props: TimePickerProps) {
  return <KendoTimePicker {...props} />;
}

export default TimePicker;
