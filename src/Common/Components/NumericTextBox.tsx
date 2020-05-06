import {
  NumericTextBox as KendoNumericTextBox,
  NumericTextBoxProps as KendoNumericTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getNumberValue, parseNumberFromString } from "../Utils/NumberUtil";

type NumericTextBoxProps = FormFieldChildProps &
  Omit<KendoNumericTextBoxProps, "value"> & {
    min?: string;
    max?: string;
  };

function NumericTextBox(props: NumericTextBoxProps) {
  const value = getNumberValue(props.value);
  const minValue = parseNumberFromString(props.min);
  const maxValue = parseNumberFromString(props.max);
  return (
    <KendoNumericTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
      min={minValue}
      max={maxValue}
    />
  );
}

export default NumericTextBox;
