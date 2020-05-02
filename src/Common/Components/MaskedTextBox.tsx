import {
  MaskedTextBox as KendoMaskedTextBox,
  MaskedTextBoxProps as KendoMaskedTextBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FormFieldProps } from "../Types/FormFieldProps";

type MaskedTextBoxProps = KendoMaskedTextBoxProps & FormFieldProps;

function MaskedTextBox(props: MaskedTextBoxProps) {
  return <KendoMaskedTextBox {...props} />;
}

export default MaskedTextBox;
