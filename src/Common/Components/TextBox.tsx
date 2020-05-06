import {
  Input as KendoTextBox,
  InputProps as KendoTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { parseBooleanFromString } from "../Utils/BooleanUtil";
import { parseNumberFromString } from "../Utils/NumberUtil";
import { getTextValue } from "../Utils/TextUtil";

type TextBoxProps = FormFieldChildProps &
  Omit<KendoTextBoxProps, "value" | "multiple"> & {
    multiline?: string;
    min?: string;
    max?: string;
  };

function TextBox(props: TextBoxProps) {
  //Extract onValueChange out of props to avoid warning
  //Unknown event handler property `onValueChange`.
  const { onValueChange, ...others } = props;
  const multiline = parseBooleanFromString(props.multiline);
  const minValue = parseNumberFromString(props.min);
  const maxValue = parseNumberFromString(props.max);

  return (
    <KendoTextBox
      {...others}
      onChange={(e) => onValueChange(e.target.value)}
      value={getTextValue(props.value)}
      multiple={multiline}
      minLength={minValue}
      maxLength={maxValue}
    />
  );
}

export default TextBox;
