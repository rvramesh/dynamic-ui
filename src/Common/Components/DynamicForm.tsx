import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { DynamicFormProvider } from "../Context/DynamicFormContext";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import { FormFieldSetProps } from "./FormFieldSet";

type DynamicFormWithChildren = {
  children: FormElement[] | FormElement;
};

type DynamicFormWithProps = {
  formSchema: FormChildProps[];
};

type DynamicFormProps = DynamicFormWithChildren | DynamicFormWithProps;

export type FormChildProps = FormFieldProps | FormFieldSetProps;
export type FormElement = React.ReactElement<FormChildProps>;

const queryConfig = { refetchAllOnWindowFocus: false };

function isDynamicFormWithProps(
  value: DynamicFormProps
): value is DynamicFormWithProps {
  return Array.isArray((value as DynamicFormWithProps).formSchema);
}

function DynamicForm(props: DynamicFormProps) {
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
