import {
  MaskedTextBox as KendoMaskedTextBox,
  MaskedTextBoxProps as KendoMaskedTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getTextValue } from "../Utils/TextUtil";

type MaskedTextBoxProps = Omit<KendoMaskedTextBoxProps, "value"> &
  FormFieldChildProps;

function MaskedTextBox(props: MaskedTextBoxProps) {
  const value = getTextValue(props.value);
  return (
    <KendoMaskedTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      value={value}
    />
  );
}

export default MaskedTextBox;
