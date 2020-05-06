import {
  DateRangePicker as KendoDateRangePicker,
  DateRangePickerProps as KendoDateRangePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateRangeValue, parseOffsetAndGetDate } from "../Utils/DateUtils";

type DateRangePickerProps = FormFieldChildProps &
  Omit<KendoDateRangePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

function DateRangePicker(props: DateRangePickerProps) {
  const value = getDateRangeValue(props.value);
  const minValue = props.min ? parseOffsetAndGetDate(props.min) : undefined;
  const maxValue = props.max ? parseOffsetAndGetDate(props.max) : undefined;

  return (
    <KendoDateRangePicker
      {...props}
      onChange={(e) =>
        props.onValueChange({ start: e.value.start, end: e.value.end })
      }
      value={value}
      min={minValue}
      max={maxValue}
    />
  );
}

export default DateRangePicker;
