import {
  Input as KendoTextBox,
  InputProps as KendoTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getTextValue } from "../Utils/TextUtil";

type TextBoxProps = Omit<KendoTextBoxProps, "value"> & FormFieldChildProps;

function TextBox(props: TextBoxProps) {
  return (
    <KendoTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.target.value)}
      value={getTextValue(props.value)}
    />
  );
}

export default TextBox;
