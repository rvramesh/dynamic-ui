import { Grid } from "@material-ui/core";
import { uniqueId } from "lodash";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { FormFieldChildProps } from "../Types/FormFieldChildProps";

type FormFieldProps = {
  component: React.ComponentType<FormFieldChildProps>;
  displayName: string;
} & Omit<FormFieldChildProps, "id">;

const FormField: FunctionComponent<FormFieldProps> = (
  props: FormFieldProps
) => {
  const Component = props.component;
  const { component, displayName, ...other } = props;
  //Lazy initialize the state value. Will be called only on first render.
  const [id] = useState(() => uniqueId("form-component-"));
  return (
    <React.Fragment>
      <Grid item xs={12} sm={3}>
        <label htmlFor={id}>{props.displayName}</label>
      </Grid>
      <Grid item xs={12} sm={9}>
        {<Component id={id} {...other} />}
      </Grid>
    </React.Fragment>
  );
};

export default FormField;
