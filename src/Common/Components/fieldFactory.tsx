import * as React from "react";
import FormField, { FormFieldProps } from "./FormField";
import FormFieldSet, { FormFieldSetProps } from "./FormFieldSet";

export const fieldFactory = (prop: FormFieldProps | FormFieldSetProps) =>
  prop.type !== "FieldSet" ? (
    <FormField {...prop} />
  ) : (
    <FormFieldSet {...prop} />
  );
