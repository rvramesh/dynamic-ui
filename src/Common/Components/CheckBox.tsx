import {
  Checkbox as KendoCheckBox,
  CheckboxProps as KendoCheckBoxProps,
} from "@progress/kendo-react-inputs";
import * as React from "react";
import { FunctionComponent } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";
import { getBooleanValue } from "../Utils/BooleanUtil";

type CheckBoxProps = FormFieldChildProps & Omit<KendoCheckBoxProps, "value">;

const CheckBox: FunctionComponent<CheckBoxProps> = (props) => {
  //Extract onValueChange out of props to avoid warning
  //Unknown event handler property `onValueChange`.
  const { onValueChange, valid, ...others } = props;

  return (
    <KendoCheckBox
      {...others}
      onChange={(e) => onValueChange(e.value)}
      value={getBooleanValue(props.value)}
    />
  );
};

export default CheckBox;
