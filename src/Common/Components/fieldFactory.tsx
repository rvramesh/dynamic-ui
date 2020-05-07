import * as React from "react";
import { FormChildProps } from "./DynamicForm";
import FormField from "./FormField";
import FormFieldSet from "./FormFieldSet";

export const fieldFactory = (prop: FormChildProps) =>
  prop.type !== "FieldSet" ? (
    <FormField {...prop} key={prop.name} />
  ) : (
    <FormFieldSet {...prop} key={prop.name} />
  );
