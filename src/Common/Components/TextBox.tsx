import {
  Input as KendoTextBox,
  InputProps as KendoTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type TextBoxProps = KendoTextBoxProps & FormFieldProps;

function TextBox(props: TextBoxProps) {
  return <KendoTextBox {...props} />;
}

export default TextBox;
