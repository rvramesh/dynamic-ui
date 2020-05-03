import {
  Input as KendoTextBox,
  InputProps as KendoTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getTextValue } from "../Utils/TextUtil";

type TextBoxProps = Omit<KendoTextBoxProps, "value"> & FormFieldChildProps;

function TextBox(props: TextBoxProps) {
  //Extract onValueChange out of props to avoid warning
  //Unknown event handler property `onValueChange`.
  const { onValueChange, ...others } = props;
  return (
    <KendoTextBox
      {...others}
      onChange={(e) => onValueChange(e.target.value)}
      value={getTextValue(props.value)}
    />
  );
}

export default TextBox;
