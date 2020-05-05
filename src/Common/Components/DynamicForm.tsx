import * as React from "react";
import { ReactQueryConfigProvider } from "react-query/types";
import { DynamicFormProvider } from "../Context/DynamicFormContext";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import { FormFieldSetProps } from "./FormFieldSet";

type DynamicFormProps = (FormFieldProps | FormFieldSetProps)[];

const queryConfig = { refetchAllOnWindowFocus: false };

function DynamicForm(props: DynamicFormProps) {
  return (
    <DynamicFormProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        {props.map(fieldFactory)}
      </ReactQueryConfigProvider>
    </DynamicFormProvider>
  );
}

export default DynamicForm;
