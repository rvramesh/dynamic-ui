import {
  DateRangePicker as KendoDateRangePicker,
  DateRangePickerProps as KendoDateRangePickerProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";
import { FunctionComponent, useRef } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getDateRangeValue, parseOffsetAndGetDate } from "../Utils/DateUtils";
import DateInput from "./DateInput";

type DateRangePickerProps = FormFieldChildProps &
  Omit<KendoDateRangePickerProps, "value" | "min" | "max"> & {
    min?: string;
    max?: string;
  };

const DateRangePicker: FunctionComponent<DateRangePickerProps> = (props) => {
  const value = getDateRangeValue(props.value);
  const minValue = props.min ? parseOffsetAndGetDate(props.min) : undefined;
  const maxValue = props.max ? parseOffsetAndGetDate(props.max) : undefined;
  const timerToClear = useRef<number | null>();
  const clearDeferredBlur = () =>
    timerToClear.current && clearTimeout(timerToClear.current);

  return (
    <KendoDateRangePicker
      {...props}
      onChange={(e) =>
        props.onValueChange({ start: e.value.start, end: e.value.end })
      }
      value={value ?? { start: null, end: null }}
      min={minValue}
      max={maxValue}
      style={{ width: "100%" }}
      startDateInput={DateInput}
      endDateInput={DateInput}
      onBlur={() => {
        timerToClear.current = setTimeout(() => {
          clearDeferredBlur();
          props.onBlur();
        });
      }}
      onFocus={clearDeferredBlur}
    />
  );
};

export default DateRangePicker;
