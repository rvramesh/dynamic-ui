import {
  DatePicker as KendoDatePicker,
  DatePickerProps as KendoDatePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type DatePickerProps = KendoDatePickerProps & FormFieldChildProps;

function DatePicker(props: DatePickerProps) {
  return <KendoDatePicker {...props} />;
}

export default DatePicker;
