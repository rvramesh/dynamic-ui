import {
  Input as KendoTextBox,
  InputProps as KendoTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type TextBoxProps = KendoTextBoxProps & FormFieldChildProps;

function TextBox(props: TextBoxProps) {
  return (
    <KendoTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.target.value)}
    />
  );
}

export default TextBox;
