import {
  NumericTextBox as KendoNumericTextBox,
  NumericTextBoxProps as KendoNumericTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type NumericTextBoxProps = KendoNumericTextBoxProps & FormFieldChildProps;

function NumericTextBox(props: NumericTextBoxProps) {
  return <KendoNumericTextBox {...props} />;
}

export default NumericTextBox;
