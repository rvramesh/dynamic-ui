import {
  DateTimePicker as KendoDateTimePicker,
  DateTimePickerProps as KendoDateTimePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type DateTimePickerProps = KendoDateTimePickerProps & FormFieldChildProps;

function DateTimePicker(props: DateTimePickerProps) {
  return <KendoDateTimePicker {...props} />;
}

export default DateTimePicker;
