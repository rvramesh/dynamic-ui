import {
  NumericTextBox as KendoNumericTextBox,
  NumericTextBoxProps as KendoNumericTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getNumberValue } from "../Utils/NumberUtil";

type NumericTextBoxProps = Omit<KendoNumericTextBoxProps, "value"> &
  FormFieldChildProps;

function NumericTextBox(props: NumericTextBoxProps) {
  const value = getNumberValue(props.value);
  return (
    <KendoNumericTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
    />
  );
}

export default NumericTextBox;
