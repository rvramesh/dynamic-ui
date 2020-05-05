import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { DynamicFormProvider } from "../Context/DynamicFormContext";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import { FormFieldSetProps } from "./FormFieldSet";

type DynamicFormWithChildren = {
  children: FormElement;
};

type DynamicFormWithProps = {
  formSchema: FormProps[];
};

type DynamicFormProps = DynamicFormWithChildren | DynamicFormWithProps;

export type FormProps = FormFieldProps | FormFieldSetProps;
export type FormElement =
  | React.ReactElement<FormFieldSetProps>
  | React.ReactElement<FormFieldProps>
  | FormElement[];

const queryConfig = { refetchAllOnWindowFocus: false };

function isDynamicFormWithProps(
  value: DynamicFormProps
): value is DynamicFormWithProps {
  return Array.isArray((value as DynamicFormWithProps).formSchema);
}

function DynamicForm(props: DynamicFormProps) {
  debugger;
  if (isDynamicFormWithProps(props)) {
    const children = props.formSchema.map(fieldFactory);
    return (
      <DynamicFormProvider>
        <ReactQueryConfigProvider config={queryConfig}>
          {children}
        </ReactQueryConfigProvider>
      </DynamicFormProvider>
    );
  } else {
    return (
      <DynamicFormProvider>
        <ReactQueryConfigProvider config={queryConfig}>
          {props.children}
        </ReactQueryConfigProvider>
      </DynamicFormProvider>
    );
  }
}

export default DynamicForm;
