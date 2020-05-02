import {
  DateRangePicker as KendoDateRangePicker,
  DateRangePickerProps as KendoDateRangePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type DateRangePickerProps = KendoDateRangePickerProps & FormFieldChildProps;

function DateRangePicker(props: DateRangePickerProps) {
  return <KendoDateRangePicker {...props} />;
}

export default DateRangePicker;
