import {
  MaskedTextBox as KendoMaskedTextBox,
  MaskedTextBoxProps as KendoMaskedTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type MaskedTextBoxProps = KendoMaskedTextBoxProps & FormFieldChildProps;

function MaskedTextBox(props: MaskedTextBoxProps) {
  return (
    <KendoMaskedTextBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
    />
  );
}

export default MaskedTextBox;
