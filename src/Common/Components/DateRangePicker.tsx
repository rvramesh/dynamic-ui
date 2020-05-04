import {
  DateRangePicker as KendoDateRangePicker,
  DateRangePickerProps as KendoDateRangePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateRangeValue } from "../Utils/DateUtils";

type DateRangePickerProps = Omit<KendoDateRangePickerProps, "value"> &
  FormFieldChildProps;

function DateRangePicker(props: DateRangePickerProps) {
  const value = getDateRangeValue(props.value);
  return (
    <KendoDateRangePicker
      {...props}
      onChange={(e) =>
        props.onValueChange({ start: e.value.start, end: e.value.end })
      }
      value={value}
    />
  );
}

export default DateRangePicker;
