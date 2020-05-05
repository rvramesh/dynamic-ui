import * as React from "react";
import { FormProps } from "./DynamicForm";
import FormField from "./FormField";
import FormFieldSet from "./FormFieldSet";

export const fieldFactory = (prop: FormProps) =>
  prop.type !== "FieldSet" ? (
    <FormField {...prop} />
  ) : (
    <FormFieldSet {...prop} />
  );
