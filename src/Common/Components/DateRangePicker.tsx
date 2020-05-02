import {
  DateRangePicker as KendoDateRangePicker,
  DateRangePickerProps as KendoDateRangePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type DateRangePickerProps = KendoDateRangePickerProps & FormFieldProps;

function DateRangePicker(props: DateRangePickerProps) {
  return <KendoDateRangePicker {...props} />;
}

export default DateRangePicker;
