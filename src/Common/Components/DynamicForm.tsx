import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { DynamicFormProvider } from "../Context/DynamicFormContext";
import { FormFieldProps } from "./FormField";
import { FormFieldSetProps } from "./FormFieldSet";

type DynamicFormProps = {
  children: FormElement;
};

export type FormElement =
  | React.ReactElement<FormFieldSetProps>
  | React.ReactElement<FormFieldProps>
  | FormElement[];

const queryConfig = { refetchAllOnWindowFocus: false };

function DynamicForm(props: DynamicFormProps) {
  return (
    <DynamicFormProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        {props.children}
      </ReactQueryConfigProvider>
    </DynamicFormProvider>
  );
}

export default DynamicForm;
