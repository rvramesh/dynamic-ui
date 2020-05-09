import { Grid } from "@material-ui/core";
import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import {
  DynamicFormProvider,
  FormValidationState,
  FormValues,
} from "../Context/DynamicFormContext";
import ActionBar from "./ActionBar";
import { fieldFactory } from "./fieldFactory";
import { FormFieldProps } from "./FormField";
import { FormFieldSetProps } from "./FormFieldSet";

type DynamicFormWithChildren = {
  children: FormElement[] | FormElement;
  initialValues?: FormValues;
};

type DynamicFormWithProps = {
  formSchema: FormChildProps[];
  initialValues?: FormValues;
  submitText: string;
  clearText: string;
  onSubmit: (values: FormValues, validationState: FormValidationState) => void;
};

type DynamicFormProps = DynamicFormWithProps; //| DynamicFormWithChildren;

export type FormChildProps = FormFieldProps | FormFieldSetProps;
export type FormElement = React.ReactElement<FormChildProps>;

const queryConfig = { refetchAllOnWindowFocus: false };

function isDynamicFormWithProps(
  value: DynamicFormProps
): value is DynamicFormWithProps {
  return Array.isArray((value as DynamicFormWithProps).formSchema);
}

function DynamicForm(props: DynamicFormProps) {
  //if (isDynamicFormWithProps(props)) {
  const children = props.formSchema.map(fieldFactory);
  return (
    <DynamicFormProvider
      formSchema={props.formSchema}
      initialValues={props.initialValues}
      showError={false}
    >
      <ReactQueryConfigProvider config={queryConfig}>
        <Grid container spacing={0}>
          {children}
          <ActionBar
            clearText={props.clearText}
            submitText={props.submitText}
            onSubmit={props.onSubmit}
          ></ActionBar>
        </Grid>
      </ReactQueryConfigProvider>
    </DynamicFormProvider>
  );
  // } else {
  //   return (
  //     <DynamicFormProvider
  //       initialValues={props.initialValues}
  //       validateInitialValues={false}
  //     >
  //       <ReactQueryConfigProvider config={queryConfig}>
  //         {props.children}
  //       </ReactQueryConfigProvider>
  //     </DynamicFormProvider>
  //   );
  // }
}

export default DynamicForm;
