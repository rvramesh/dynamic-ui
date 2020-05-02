import {
  DateTimePicker as KendoDateTimePicker,
  DateTimePickerProps as KendoDateTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type DateTimePickerProps = KendoDateTimePickerProps & FormFieldProps;

function DateTimePicker(props: DateTimePickerProps) {
  return <KendoDateTimePicker {...props} />;
}

export default DateTimePicker;
