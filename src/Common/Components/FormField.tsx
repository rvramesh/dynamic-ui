import { Grid } from "@material-ui/core";
import { uniqueId } from "lodash";
import * as React from "react";
import { useState } from "react";

interface FormFieldProps {
  component: React.ComponentType<any>;
  displayName: string;
  name: string;
}

function FormField(props: FormFieldProps) {
  const Component = props.component;
  const [id] = useState(() => uniqueId("form-component-"));
  return (
    <React.Fragment>
      <Grid item xs={12} sm={3}>
        <label htmlFor={id}>{props.displayName}</label>
      </Grid>
      <Grid item xs={12} sm={9}>
        {<Component id={id} name={props.name} />}
      </Grid>
    </React.Fragment>
  );
}

export default FormField;
