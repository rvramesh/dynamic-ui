import {
  NumericTextBox as KendoNumericTextBox,
  NumericTextBoxProps as KendoNumericTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type NumericTextBoxProps = KendoNumericTextBoxProps & FormFieldProps;

function NumericTextBox(props: NumericTextBoxProps) {
  return <KendoNumericTextBox {...props} />;
}

export default NumericTextBox;
