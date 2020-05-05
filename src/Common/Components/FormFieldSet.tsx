import * as React from "react";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";

export type FormFieldSetProps = {
  children: (FormFieldProps | FormFieldSetProps)[];
  type: "FieldSet";
};

function FormFieldSet(props: FormFieldSetProps) {
  return <React.Fragment>{props.children.map(fieldFactory)}</React.Fragment>;
}

export default FormFieldSet;
