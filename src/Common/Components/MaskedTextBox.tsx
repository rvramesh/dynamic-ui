import {
  MaskedTextBox as KendoMaskedTextBox,
  MaskedTextBoxProps as KendoMaskedTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FunctionComponent } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getTextValue } from "../Utils/TextUtil";

type MaskedTextBoxProps = Omit<KendoMaskedTextBoxProps, "value" | "rules"> &
  FormFieldChildProps;

const MaskedTextBox: FunctionComponent<MaskedTextBoxProps> = (props) => {
  const value = getTextValue(props.value);
  return (
    <KendoMaskedTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
      width="100%"
    />
  );
};

export default MaskedTextBox;
